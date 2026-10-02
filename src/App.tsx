import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CustomOrderPage from "./pages/CustomOrderPage";
import StoryPage from "./pages/StoryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import NotFoundPage from "./pages/NotFoundPage";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Setia — Modest. Feminine. Unmistakably you.", description: "Setia creates modest, feminine womenswear in Nairobi, from small-batch dresses to custom orders." },
  "/shop": { title: "Shop the collection | Setia Modest Womenswear", description: "Explore Setia’s considered collection of modest dresses and small-batch womenswear." },
  "/custom-order": { title: "Custom orders | Setia Modest Womenswear", description: "Request a custom Setia outfit for yourself, your group, or your next special occasion." },
  "/our-story": { title: "Our story | Setia Modest Womenswear", description: "Learn about Setia’s thoughtful approach to modest, feminine clothing made in Nairobi." },
  "/admin/login": { title: "Owner login | Setia", description: "Secure Setia collection management." },
  "/admin/products": { title: "Manage collection | Setia", description: "Manage Setia outfits, availability, visibility, and product details." },
};
function MetaManager() { const { pathname } = useLocation(); useEffect(() => { const meta = routeMeta[pathname] ?? { title: "Page not found | Setia", description: "The Setia page you requested could not be found." }; document.title = meta.title; let description = document.querySelector('meta[name="description"]'); if (!description) { description = document.createElement("meta"); description.setAttribute("name", "description"); document.head.appendChild(description); } description.setAttribute("content", meta.description); document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title); document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description); }, [pathname]); return null; }
function ScrollToTop() { const { pathname } = useLocation(); useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]); return null; }
export default function App() { return <BrowserRouter><MetaManager /><ScrollToTop /><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/shop" element={<ShopPage />} /><Route path="/shop/:productId" element={<ProductPage />} /><Route path="/custom-order" element={<CustomOrderPage />} /><Route path="/our-story" element={<StoryPage />} /><Route path="/admin/login" element={<AdminLoginPage />} /><Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /><WhatsAppFab /></BrowserRouter>; }
