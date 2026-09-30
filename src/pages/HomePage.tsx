import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import PlaceholderFigure from "../components/PlaceholderFigure";
import Reveal from "../components/Reveal";
import { useProducts } from "../hooks/useProducts";
import "../pages.css";

export default function HomePage() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 3);
  return <div className="page"><Hero /><Reveal><section className="page__content"><div className="wrap"><div className="page__section-head"><div><p className="eyebrow">The edit / 01</p><h2>A few favourites.</h2></div><Link to="/shop">View all pieces ↗</Link></div>{loading ? <p className="page__lede">Loading the latest pieces…</p> : featured.length ? <div className="featured-grid">{featured.map((product, index) => <article className="featured-card" key={product.id} style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}><Link to={`/shop/${product.id}`} className="featured-card__art">{product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderFigure label={product.category} />}</Link><div className="featured-card__info"><h3>{product.name}</h3><span>{product.price}</span></div><Link className="featured-card__link" to={`/shop/${product.id}`}>View piece ↗</Link></article>)}</div> : <p className="page__lede">The next Setia edit is being prepared. Visit the shop soon.</p>}</div></section></Reveal><Reveal><section className="custom home__custom"><div className="wrap"><p className="eyebrow">Made for you</p><h2>Have something else in mind?</h2><p className="page__lede">Bring us a sketch, a reference, or just an idea. We’ll help you make it real.</p><Link className="btn btn-on-dark" to="/custom-order">Explore custom orders ↗</Link></div></section></Reveal></div>;
}
