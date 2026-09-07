import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

import "./layout.css";

export default function Layout() {
  return (
    <div
      id="page"
      className="layoutContainer"
    >
      {/* Lien d'évitement (Skip Link) pour l'accessibilité clavier/lecteur d'écran */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Navigation globale */}
      <Nav />

      {/* Zone de contenu principal dynamique */}
      <main id="main-content" className="mainContainer" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}