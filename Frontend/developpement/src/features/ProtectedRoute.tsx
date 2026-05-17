import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import HomePage from "../pages/HomePage/HomePage";


export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/auth/me", {
      credentials: "include",
    })
      .then((res) => setAuthed(res.ok))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  console.log(authed);

  return authed ? <Outlet /> : <Navigate to="login" replace />;
}