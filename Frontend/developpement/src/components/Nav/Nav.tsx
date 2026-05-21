import Icone, { StyleType } from "../Icones/Icone";
import "./navStyle.css";

import Home from "../../assets/icones/home.svg?react";
import Project from "../../assets/icones/project.svg?react";
import Mission from "../../assets/icones/mandatoryMission.svg?react";
import Logout from "../../assets/icones/logout.svg?react";

export default function Nav() {
  return (
    <div className="navContainerStyle">
      <div className="greetingContainer">
        <p className="greetingtext">Hello Nico</p>
        <div className="nicoPpStyle" />
      </div>
      <div className="navigationNavContainer">
        <div className="homeNavContainer iconeNavContainerStyle">
          <Icone SrcIcone={Home} styleType={StyleType.style2} />
          <p className="navText">Home</p>
        </div>
        <div className="projectsNavContainer iconeNavContainerStyle">
          <Icone SrcIcone={Project} styleType={StyleType.style2} />
          <p className="navText">Projects</p>
        </div>
        <div className="missionsNavContainer iconeNavContainerStyle">
          <Icone SrcIcone={Mission} styleType={StyleType.style2} />
          <p className="navText">Missions</p>
        </div>
      </div>
      <div className="logoutContainer">
        <p className="logoutText">Déconnexion</p>
          <Icone SrcIcone={Logout} styleType={StyleType.style3} />
      </div>
    </div>
  );
}
