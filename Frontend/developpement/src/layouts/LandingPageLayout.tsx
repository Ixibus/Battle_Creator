import { Outlet } from "react-router-dom";
import "./landingPageLayout.css";

export default function LandingPageLayout() {
  return (
    <div id="page" className="landingPageLayoutContainer">
      {/* Lien d'évitement pour l'accessibilité au clavier / lecteur d'écran */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* Zone de contenu principal dynamique */}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}