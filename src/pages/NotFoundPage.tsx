import { Link } from "react-router-dom";
import "../pages.css";
export default function NotFoundPage() { return <div className="not-found page"><p className="eyebrow">404 / Setia</p><h1>This page has moved on.</h1><p>Let’s take you back to the collection.</p><Link className="btn" to="/shop">Back to the shop</Link></div>; }
