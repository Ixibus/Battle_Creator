import { Navigate, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => setAuthed(res.ok))
      .catch(() => setAuthed(false))
      .finally(() => setLoading(false));
  }, [location.pathname, navigationType]);

  if (loading) return <div>Chargement...</div>;

  return authed ? <Outlet /> : <Navigate to="/connexionPage" replace state={{ from: location }} />;
}