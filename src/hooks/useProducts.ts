import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Product } from "../data/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      if (!isSupabaseConfigured) {
        setError("Add your Supabase values to .env.local, then restart the development server.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const mappedProducts: Product[] = (data ?? []).map((item) => ({
        id: item.slug,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image_url,
        sizes: item.sizes,
        category: item.category === "Abayas" ? "Skirt" : item.category,
        inStock: item.in_stock,
      }));

      setProducts(mappedProducts);
      setLoading(false);
    }

    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
}
