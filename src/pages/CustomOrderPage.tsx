import CustomOrder from "../components/CustomOrder";
import "../pages.css";

export default function CustomOrderPage() {
  return <div className="page"><section className="page__hero"><div className="wrap"><p className="eyebrow">Made to order</p><h1>Make it yours.</h1><p className="page__lede">From one special dress to a coordinated group order, we’ll work with you to create something that feels unmistakably yours.</p></div></section><CustomOrder /></div>;
}
