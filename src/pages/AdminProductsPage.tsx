import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const categories = ["Dresses", "Sets", "Skirt", "Tops"];
const MAX_IMAGE_SIZE = 6 * 1024 * 1024;

type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  category: string;
  sizes: string;
  image_url: string | null;
  image_path: string | null;
  in_stock: boolean;
  published: boolean;
  created_at: string;
};

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Dresses");
  const [sizes, setSizes] = useState("XS – XL");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [inStock, setInStock] = useState(true);
  const [published, setPublished] = useState(true);

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function loadProducts() {
    setProductsLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(`Could not load products: ${error.message}`);
      setProductsLoading(false);
      return;
    }

    setProducts(
      ((data ?? []) as AdminProduct[]).map((product) => ({
        ...product,
        category: product.category === "Abayas" ? "Skirt" : product.category,
      })),
    );
    setProductsLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function selectImage(file: File | null) {
    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please choose a JPEG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setMessage("Please choose an image smaller than 6 MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  function resetForm() {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("Dresses");
    setSizes("XS – XL");
    setImage(null);
    setPreview("");
    setInStock(true);
    setPublished(true);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!image) {
      setMessage("Please select an outfit image.");
      return;
    }

    const slug = createSlug(name);

    if (!slug) {
      setMessage("Please enter a valid outfit name.");
      return;
    }

    setSaving(true);
    setMessage("");

    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `${slug}-${crypto.randomUUID()}.${extension}`;

    const upload = await supabase.storage
      .from("product-images")
      .upload(filePath, image, {
        contentType: image.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (upload.error) {
      setMessage(`Image upload failed: ${upload.error.message}`);
      setSaving(false);
      return;
    }

    const imageUrl = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath).data.publicUrl;

    const result = await supabase.from("products").insert({
      slug,
      name: name.trim(),
      price: price.trim(),
      description: description.trim(),
      category,
      sizes: sizes.trim(),
      image_url: imageUrl,
      image_path: filePath,
      in_stock: inStock,
      published,
    });

    if (result.error) {
      // Remove the uploaded image if saving the product fails.
      await supabase.storage
        .from("product-images")
        .remove([filePath]);

      setMessage(`Product could not be saved: ${result.error.message}`);
      setSaving(false);
      return;
    }

    resetForm();
    setMessage("Outfit saved successfully.");
    setSaving(false);

    await loadProducts();
  }

  async function toggleStock(product: AdminProduct) {
    const nextStockStatus = !product.in_stock;

    const { error } = await supabase
      .from("products")
      .update({
        in_stock: nextStockStatus,
      })
      .eq("id", product.id);

    if (error) {
      setMessage(`Could not update product: ${error.message}`);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.id === product.id
          ? { ...item, in_stock: nextStockStatus }
          : item
      )
    );

    setMessage(
      nextStockStatus
        ? `${product.name} is marked as available.`
        : `${product.name} is marked as taken.`
    );
  }

  async function togglePublished(product: AdminProduct) {
    const nextPublishedStatus = !product.published;

    const { error } = await supabase
      .from("products")
      .update({
        published: nextPublishedStatus,
      })
      .eq("id", product.id);

    if (error) {
      setMessage(`Could not update publication status: ${error.message}`);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.map((item) =>
        item.id === product.id
          ? { ...item, published: nextPublishedStatus }
          : item
      )
    );

    setMessage(
      nextPublishedStatus
        ? `${product.name} is now visible in the shop.`
        : `${product.name} is now hidden from the shop.`
    );
  }

  async function deleteProduct(product: AdminProduct) {
    const confirmed = window.confirm(
      `Delete "${product.name}" permanently? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setMessage("");

    if (product.image_path) {
      const { error: imageError } = await supabase.storage
        .from("product-images")
        .remove([product.image_path]);

      if (imageError) {
        setMessage(`Could not delete product image: ${imageError.message}`);
        return;
      }
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (error) {
      setMessage(`Could not delete product: ${error.message}`);
      return;
    }

    setProducts((currentProducts) =>
      currentProducts.filter((item) => item.id !== product.id)
    );

    setMessage(`${product.name} was deleted.`);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <main className="admin-page">
      <div className="wrap admin-card">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Collection manager</p>
            <h1>Add an outfit</h1>
          </div>

          <button
            className="btn btn-outline admin-signout"
            type="button"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Outfit name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="The Amara Dress"
              required
            />
          </label>

          <label>
            Price
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="KSh 4,500"
              required
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Available sizes
            <input
              value={sizes}
              onChange={(event) => setSizes(event.target.value)}
              placeholder="XS – XL, made to order"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the outfit, fabric, fit, and details."
              rows={5}
              required
            />
          </label>

          <label>
            Outfit photo
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) =>
                selectImage(event.target.files?.[0] ?? null)
              }
              required
            />

            {preview && (
              <img
                className="admin-preview"
                src={preview}
                alt="Selected outfit preview"
              />
            )}
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) => setInStock(event.target.checked)}
            />
            Available to order
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
            />
            Publish immediately
          </label>

          <button className="btn" type="submit" disabled={saving}>
            {saving ? "Uploading…" : "Publish outfit"}
          </button>

          {message && (
            <p className="admin-message" role="status">
              {message}
            </p>
          )}
        </form>

        <section className="admin-products">
          <div className="admin-products__heading">
            <div>
              <p className="eyebrow">Current collection</p>
              <h2>Manage outfits</h2>
            </div>

            <button
              className="btn btn-outline"
              type="button"
              onClick={loadProducts}
              disabled={productsLoading}
            >
              {productsLoading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {productsLoading ? (
            <p>Loading products…</p>
          ) : products.length === 0 ? (
            <p>No products have been added yet.</p>
          ) : (
            <div className="admin-products__list">
              {products.map((product) => (
                <article className="admin-product" key={product.id}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="admin-product__image"
                    />
                  ) : (
                    <div className="admin-product__image admin-product__image--empty">
                      No image
                    </div>
                  )}

                  <div className="admin-product__details">
                    <p className="eyebrow">{product.category}</p>

                    <h3>{product.name}</h3>

                    <p>{product.price}</p>

                    <div className="admin-product__statuses">
                      <span
                        className={
                          product.in_stock
                            ? "status status--available"
                            : "status status--taken"
                        }
                      >
                        {product.in_stock ? "Available" : "Taken"}
                      </span>

                      <span
                        className={
                          product.published
                            ? "status status--published"
                            : "status status--hidden"
                        }
                      >
                        {product.published ? "Published" : "Hidden"}
                      </span>
                    </div>
                  </div>

                  <div className="admin-product__actions">
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => toggleStock(product)}
                    >
                      {product.in_stock
                        ? "Mark as taken"
                        : "Mark as available"}
                    </button>

                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => togglePublished(product)}
                    >
                      {product.published ? "Hide" : "Publish"}
                    </button>

                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => deleteProduct(product)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
