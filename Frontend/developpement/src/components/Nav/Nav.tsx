import Icone, { StyleType } from "../Icones/Icone";
import "./navStyle.css";

import home from "../../assets/icones/home.svg";
import project from "../../assets/icones/project.svg";
import mission from "../../assets/icones/mandatoryMission.svg";
import logout from "../../assets/icones/logout.svg";

export default function Nav() {
  return (
    <div className="navContainerStyle">
      <div className="greetingContainer">
        <p className="greetingtext">Hello Nico</p>
        <div className="nicoPpStyle" />
      </div>
      <div className="navigationNavContainer">
        <div className="homeNavContainer iconeNavContainerStyle">
          <Icone srcIcone={home} styleType={StyleType.style2} />
          <p className="navText">Home</p>
        </div>
        <div className="projectsNavContainer iconeNavContainerStyle">
          <Icone srcIcone={project} styleType={StyleType.style2} />
          <p className="navText">Projects</p>
        </div>
        <div className="missionsNavContainer iconeNavContainerStyle">
          <Icone srcIcone={mission} styleType={StyleType.style2} />
          <p className="navText">Missions</p>
        </div>
      </div>
      <div className="logoutContainer">
        <p className="logoutText">Déconnexion</p>
          <Icone srcIcone={logout} styleType={StyleType.style3} />
      </div>
    </div>
  );
}
