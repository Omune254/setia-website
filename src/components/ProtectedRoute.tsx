import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "allowed" | "denied">("loading");

  useEffect(() => {
    let active = true;
    async function checkAdmin() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { if (active) setStatus("denied"); return; }
      const { data, error } = await supabase.rpc("is_admin");
      if (active) setStatus(!error && data === true ? "allowed" : "denied");
    }
    checkAdmin();
    return () => { active = false; };
  }, []);

  if (status === "loading") return <main className="admin-page"><div className="wrap"><p>Checking account…</p></div></main>;
  if (status === "denied") return <Navigate to="/admin/login" replace />;
  return children;
}
