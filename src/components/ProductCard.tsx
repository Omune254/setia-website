import PlaceholderFigure from "./PlaceholderFigure";
import { whatsAppLink } from "../config";
import type { Product } from "../data/products";
import "./ProductCard.css";

export default function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (product: Product) => void }) {
  const message = `Hi Setia, I'd like to order the "${product.name}" (${product.price}). Is it available?`;
  return (
    <article className="card">
      <div className="card__image">
        {product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderFigure label={product.category} />}
        {!product.inStock && <span className="card__badge">Sold out</span>}
      </div>
      <div className="card__body">
        <div className="card__heading"><h3>{product.name}</h3><span className="card__price">{product.price}</span></div>
        <p className="card__desc">{product.description}</p>
        <p className="card__sizes">{product.sizes}</p>
        <div className="card__actions">
          {product.inStock ? <a className="btn card__cta" href={whatsAppLink(message)} target="_blank" rel="noreferrer">Order on WhatsApp <span aria-hidden="true">↗</span></a> : <a className="btn btn-outline card__cta" href={whatsAppLink(`Hi Setia, is the "${product.name}" coming back in stock, or can you make me one?`)} target="_blank" rel="noreferrer">Ask about a remake</a>}
          <button className="card__quick-view" onClick={() => onQuickView(product)} aria-label={`View details for ${product.name}`}>+</button>
        </div>
      </div>
    </article>
  );
}
