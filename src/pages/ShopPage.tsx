import Collection from "../components/Collection";
import "../pages.css";

export default function ShopPage() {
  return <div className="page"><section className="page__hero"><div className="wrap"><p className="eyebrow">The Setia shop</p><h1>Pieces with presence.</h1><p className="page__lede">A considered wardrobe of limited-run silhouettes, designed in Nairobi and made to order in your size.</p></div></section><Collection showIntro={false} /></div>;
}
