import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlaceholderFigure from "../components/PlaceholderFigure";
import { type Product } from "../data/products";
import { supabase } from "../lib/supabase";
import { whatsAppLink } from "../config";
import "../pages.css";

function mapProduct(item: Record<string, any>): Product {
  return { id: item.slug, name: item.name, price: item.price, description: item.description, image: item.image_url, sizes: item.sizes, category: item.category, inStock: item.in_stock };
}

export default function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadProduct() {
      if (!productId) return;
      const { data } = await supabase.from("products").select("*").eq("slug", productId).eq("published", true).single();
      if (active) { setProduct(data ? mapProduct(data) : null); setLoading(false); }
    }
    loadProduct();
    return () => { active = false; };
  }, [productId]);

  if (loading) return <div className="not-found"><p className="eyebrow">Setia shop</p><h1>Loading piece…</h1></div>;
  if (!product) return <div className="not-found"><p className="eyebrow">404 / Piece not found</p><h1>That piece has moved on.</h1><Link className="btn" to="/shop">Back to the shop</Link></div>;

  return <div className="product-detail"><div className="wrap"><Link className="product-detail__back" to="/shop">← Back to shop</Link><div className="product-detail__layout"><div className="product-detail__art">{product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderFigure label={product.category} />}</div><div className="product-detail__info"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><p className="product-detail__price">{product.price}</p><p className="product-detail__description">{product.description}</p><div className="product-detail__meta"><div><span>Sizes</span> &nbsp; {product.sizes}</div><div><span>Availability</span> &nbsp; {product.inStock ? "Ready to order" : "Ask about a remake"}</div><div><span>Making</span> &nbsp; Small-batch / made in Nairobi</div></div><div className="product-detail__actions"><a className="btn" href={whatsAppLink(`Hi Setia, I'd like to order the ${product.name} (${product.price}). Is it available?`)} target="_blank" rel="noreferrer">{product.inStock ? "Order on WhatsApp ↗" : "Ask about a remake ↗"}</a><Link className="btn btn-outline" to="/custom-order">Request something similar</Link></div></div></div></div></div>;
}
