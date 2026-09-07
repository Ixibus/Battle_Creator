import Icone, { StyleType } from "../Icones/Icone";
import "./connexionPageNav.css";

import Logout from "../../assets/icones/logout.svg?react";
import { useNavigate } from "react-router-dom";

export default function ConnexionPageNav() {
  const navigate = useNavigate();

  function goingBackToLandingPage() {
    navigate("/");
  }

  return (
    <nav
      className="connexionPageNavContainerStyle"
      aria-label="Navigation de retour"
      style={{ height: "auto", minHeight: "fit-content" }}
    >
      <button
        type="button"
        className="connexionPageNavLogoutContainer"
        onClick={goingBackToLandingPage}
        aria-label="Retourner à la page d'accueil"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <span className="connexionPageNavLogoutText">Retour</span>
        <Icone
          SrcIcone={Logout}
          styleType={StyleType.style5}
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}