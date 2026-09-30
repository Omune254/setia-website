import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import PlaceholderFigure from "./PlaceholderFigure";
import "./Hero.css";

export default function Hero() {
  const { products, loading } = useProducts();
  const heroProduct = products[0];

  return (
    <section id="top" className="hero">
      <div className="wrap hero__inner">
        <div className="hero__text">
          <p className="eyebrow">Setia / modest womenswear</p>

          <h1>
            Quiet confidence,
              

            <em>beautifully</em> worn.
          </h1>

          <p className="hero__sub">
            Thoughtful silhouettes for women who want to feel covered,
            feminine and completely themselves.
          </p>

          <div className="hero__ctas">
            <Link to="/shop" className="btn">
              Shop the collection{" "}
              <span aria-hidden="true">↗</span>
            </Link>

            <Link to="/custom-order" className="btn btn-outline">
              Make it yours
            </Link>
          </div>

          <div className="hero__promise">
            <span>01</span>
            <p>
              Small-batch pieces
                

              made to be lived in.
            </p>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image">
            {!loading && heroProduct?.image ? (
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="hero__uploaded-image"
              />
            ) : (
              <PlaceholderFigure label="Setia lookbook" />
            )}
          </div>

          <div className="hero__caption">
            <span>{heroProduct?.name || "Look 01"}</span>
            <span>Covered / considered / yours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
