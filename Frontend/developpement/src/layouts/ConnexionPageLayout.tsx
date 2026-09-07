import { Outlet } from "react-router-dom";
import "./connexionPageLayout.css";
import ConnexionPageNav from "../components/ConnexionPageNav/ConnexionPageNav";

export default function ConnexionPageLayout() {
  return (
    <div id="page" className="connexionPageLayoutContainer">
      {/* Lien d'évitement pour l'accessibilité au clavier / lecteur d'écran */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      {/* En-tête avec la navigation de connexion */}
      <header>
        <ConnexionPageNav />
      </header>

      {/* Contenu principal de la page de connexion */}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}