import Icone, { StyleType } from "../Icones/Icone";
import "./navStyle.css";

import Home from "../../assets/icones/home.svg?react";
import Project from "../../assets/icones/project.svg?react";
import Mission from "../../assets/icones/mandatoryMission.svg?react";
import Logout from "../../assets/icones/logout.svg?react";
import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../store/useProjectStore";


export default function Nav() {

  const navigate = useNavigate();
  const {user} = useProjectStore();

  function navHandler(nav : string) {
    nav==="homePage" && navigate("/homePage");
    nav==="projectList" && navigate("/projectList");
    nav==="missionList" && navigate("/missionList");
  }

  async function logoutHandler(navLinkLogout : string) {
    const res = fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },}
    )

    if ((await res).status === 200) {
      console.log("déconnexion réussie + token effacé");
      navLinkLogout==="connexionPage" && navigate("/connexionPage");
    }

    if (!(await res).ok) {
      console.log("déconnexion non réussie");
    }
  }

  return (
    <div className="navContainerStyle">
      <div className="greetingContainer">
        <p className="greetingtext">{user?.login}</p>
        <div className="nicoPpStyle" />
      </div>
      <div className="navigationNavContainer">
        <div className="homeNavContainer iconeNavContainerStyle" 
        onClick={() => navHandler("homePage")}>
          <Icone SrcIcone={Home} styleType={StyleType.style2} />
          <p className="navText">Home</p>
        </div>
        <div className="projectsNavContainer iconeNavContainerStyle" onClick={() => navHandler("projectList")}>
          <Icone SrcIcone={Project} styleType={StyleType.style2} />
          <p className="navText">Projects</p>
        </div>
        <div className="missionsNavContainer iconeNavContainerStyle" onClick={() => navHandler("missionList")}>
          <Icone SrcIcone={Mission} styleType={StyleType.style2} />
          <p className="navText">Missions</p>
        </div>
      </div>
      <div className="logoutContainer" onClick={() => logoutHandler("connexionPage")}>
        <p className="logoutText">Déconnexion</p>
          <Icone SrcIcone={Logout} styleType={StyleType.style3} />
      </div>
    </div>
  );
}
