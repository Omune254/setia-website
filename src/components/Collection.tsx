import { useMemo, useState } from "react";
import { type Product } from "../data/products";
import { whatsAppLink } from "../config";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import PlaceholderFigure from "./PlaceholderFigure";
import "./Collection.css";

const FILTERS = ["All", "Dresses", "Sets", "Skirt", "Tops"] as const;

type Filter = (typeof FILTERS)[number];

export default function Collection({
  showIntro = true,
}: {
  showIntro?: boolean;
}) {
  const { products, loading, error } = useProducts();

  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<Product | null>(null);

  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesFilter =
        filter === "All" || product.category === filter;

      const haystack = `
        ${product.name}
        ${product.description}
        ${product.category}
      `.toLowerCase();

      return matchesFilter &&
        haystack.includes(query.toLowerCase().trim());
    });

    return [...filtered].sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return Number(b.inStock) - Number(a.inStock);
    });
  }, [products, filter, query, sort]);

  if (loading) {
    return (
      <section className="collection">
        <div className="wrap collection__status">
          <p className="eyebrow">The Setia shop</p>
          <h2>Loading the collection…</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="collection">
        <div className="wrap collection__status">
          <p className="eyebrow">The Setia shop</p>
          <h2>We’re refreshing the collection.</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="collection">
      <div className="wrap">
        {showIntro && (
          <div className="collection__intro">
            <div>
              <p className="eyebrow">The edit / 01</p>
              <h2>Pieces with presence.</h2>
            </div>

            <p className="collection__note">
              A considered wardrobe of limited-run silhouettes, designed in
              Nairobi and made to order in your size.
            </p>
          </div>
        )}

        <div
          className="collection__toolbar"
          aria-label="Collection controls"
        >
          <div
            className="collection__filters"
            role="tablist"
            aria-label="Filter by category"
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "is-active" : ""}
                onClick={() => setFilter(item)}
                role="tab"
                aria-selected={filter === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="collection__tools">
            <label className="collection__search">
              <span className="sr-only">Search collection</span>

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pieces"
              />

              <span aria-hidden="true">⌕</span>
            </label>

            <label className="collection__sort">
              <span className="sr-only">Sort collection</span>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="name">A–Z</option>
              </select>
            </label>
          </div>
        </div>

        {visibleProducts.length ? (
          <div className="collection__grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setSelected}
              />
            ))}
          </div>
        ) : (
          <div className="collection__empty">
            <p>No pieces match that search.</p>

            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("All");
              }}
            >
              Reset filters
            </button>
          </div>
        )}

        <div className="collection__footer">
          <span>
            {visibleProducts.length} of {products.length} pieces
          </span>

          <a href="/custom-order">
            Need something more personal?{" "}
            <strong>Start a custom order ↗</strong>
          </a>
        </div>
      </div>

      {selected && (
        <div
          className="quick-view-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <div
            className="quick-view"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <div className="quick-view__top">
              <span className="eyebrow">Piece details</span>

              <button
                className="quick-view__close"
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            <div className="quick-view__content">
              <div className="quick-view__art">
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="quick-view__image"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <PlaceholderFigure label={selected.category} />
                )}
              </div>

              <div className="quick-view__details">
                <p className="section-label">{selected.category}</p>

                <h2 id="quick-view-title">{selected.name}</h2>

                <p className="quick-view__price">{selected.price}</p>

                <p>{selected.description}</p>

                <div className="quick-view__meta">
                  <div>
                    <span>Fit</span> &nbsp; {selected.sizes}
                  </div>

                  <div>
                    <span>Availability</span> &nbsp;
                    {selected.inStock
                      ? "Ready to order"
                      : "Ask about a remake"}
                  </div>
                </div>

                <a
                  className="btn"
                  href={whatsAppLink(
                    `Hi Setia, I'd like to ask about the ${selected.name}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask about this piece ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
