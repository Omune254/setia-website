import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [pathname]);
  return null;
}

export default function App() {
  return <BrowserRouter><ScrollToTop /><a className="skip-link" href="#main-content">Skip to content</a><Navbar /><main id="main-content"><Routes><Route path="/" element={<HomePage />} /><Route path="/shop" element={<ShopPage />} /><Route path="/shop/:productId" element={<ProductPage />} /><Route path="/custom-order" element={<CustomOrderPage />} /><Route path="/our-story" element={<StoryPage />} /><Route path="/admin/login" element={<AdminLoginPage />} /><Route path="/admin/products" element={<ProtectedRoute><AdminProductsPage /></ProtectedRoute>} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main><Footer /><WhatsAppFab /></BrowserRouter>;
}
