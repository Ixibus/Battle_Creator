import Icone, { StyleType } from "../Icones/Icone";
import "./navStyle.css";

import Home from "../../assets/icones/home.svg?react";
import Project from "../../assets/icones/project.svg?react";
import Mission from "../../assets/icones/optionnalMission.svg?react";
import Logout from "../../assets/icones/logout.svg?react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore";

const API_URL = import.meta.env.VITE_API_URL;

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useProjectStore();

  function navHandler(path: string) {
    navigate(path);
  }

  async function logoutHandler() {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("déconnexion réussie + token effacé");
        navigate("/connexionPage");
      } else {
        console.error("déconnexion non réussie");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la déconnexion :", error);
    }
  }

  return (
    <nav className="navContainerStyle" aria-label="Navigation principale">
      <div className="greetingContainer">
        <p className="greetingtext">{user?.login || "Utilisateur"}</p>
        <div 
          className="nicoPpStyle" 
          role="img" 
          aria-label={`Avatar de ${user?.login || 'utilisateur'}`} 
        />
      </div>

      <ul className="navigationNavContainer" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <button
            type="button"
            className={`homeNavContainer iconeNavContainerStyle ${
              location.pathname === "/homePage" ? "active" : ""
            }`}
            onClick={() => navHandler("/homePage")}
            aria-current={location.pathname === "/homePage" ? "page" : undefined}
          >
            <Icone SrcIcone={Home} styleType={StyleType.style2} aria-hidden="true" />
            <span className="navText">Accueil</span>
          </button>
        </li>

        <li>
          <button
            type="button"
            className={`projectsNavContainer iconeNavContainerStyle ${
              location.pathname === "/projectList" ? "active" : ""
            }`}
            onClick={() => navHandler("/projectList")}
            aria-current={location.pathname === "/projectList" ? "page" : undefined}
          >
            <Icone SrcIcone={Project} styleType={StyleType.style2} aria-hidden="true" />
            <span className="navText">Projets</span>
          </button>
        </li>

        <li>
          <button
            type="button"
            className={`missionsNavContainer iconeNavContainerStyle ${
              location.pathname === "/missionList" ? "active" : ""
            }`}
            onClick={() => navHandler("/missionList")}
            aria-current={location.pathname === "/missionList" ? "page" : undefined}
          >
            <Icone SrcIcone={Mission} styleType={StyleType.style2} aria-hidden="true" />
            <span className="navText">Missions</span>
          </button>
        </li>
      </ul>

      <div className="logoutWrapper">
        <button
          type="button"
          className="logoutContainer"
          onClick={logoutHandler}
          aria-label="Se déconnecter de l'application"
        >
          <span className="logoutText">Déconnexion</span>
          <Icone SrcIcone={Logout} styleType={StyleType.style3} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}