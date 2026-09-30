import "./PlaceholderFigure.css";

interface PlaceholderFigureProps {
  label?: string;
  variant?: "portrait" | "square";
}

/**
 * A simple line-drawing placeholder so the layout looks finished
 * before real photography is dropped in. Swap it for a real <img>
 * as soon as photos are available.
 */
export default function PlaceholderFigure({
  label,
  variant = "portrait",
}: PlaceholderFigureProps) {
  return (
    <div className={`placeholder placeholder--${variant}`}>
      <svg viewBox="0 0 200 300" aria-hidden="true">
        <path
          d="M100 40 C 112 40 122 50 122 64 C 122 76 114 84 106 88 C 128 96 142 116 144 146 L 150 250 L 126 250 L 122 160 L 118 250 L 104 250 L 100 170 L 96 250 L 82 250 L 78 160 L 74 250 L 50 250 L 56 146 C 58 116 72 96 94 88 C 86 84 78 76 78 64 C 78 50 88 40 100 40 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      {label && <span>{label}</span>}
    </div>
  );
}
