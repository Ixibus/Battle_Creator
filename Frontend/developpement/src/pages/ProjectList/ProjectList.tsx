import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Project from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import "./ProjectList.css";

export default function ProjectList() {
  return (
    <div className="projectListContainer">
      <div className="projectListGreetingContainer">
        <div className="projectListNicoPpStyle" />
        <p className="projectListGreetingtext">Nico</p>
      </div>
      <h2 className="projectListTitle">Vos projets</h2>
      <div className="projectListProjectsContainer">
        <div className="projectListProjectContainer projectListProject1Style">
          <div className="projectListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Project} styleType={StyleType.style4} />
            <button className="projectListProjectSelectButton">
              Sélectionner
            </button>
          </div>
          <h3 className="projectListTitleProject">Battle Infinity</h3>
          <div className="projectListProjectInfoContainer">
            <p>CCVA Villeurbanne</p>
            <Icone SrcIcone={FilledPoint} />
            <p>12 juin 2026</p>
          </div>
        </div>
        <div className="projectListProjectContainer projectListProject2Style">
          <div className="projectListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Project} styleType={StyleType.style4} />
            <button className="projectListProjectSelectButton">
              Sélectionner
            </button>
          </div>
          <h3 className="projectListTitleProject">Flavorous</h3>
          <div className="projectListProjectInfoContainer">
            <p>Champ de Foire - Bordeaux</p>
            <Icone SrcIcone={FilledPoint} />
            <p>10 août 2025</p>
          </div>
        </div>
        <div className="projectListProjectContainer projectListProject3Style">
          <div className="projectListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Project} styleType={StyleType.style4} />
            <button className="projectListProjectSelectButton">
              Sélectionner
            </button>
          </div>
          <h3 className="projectListTitleProject">Summer dance</h3>
          <div className="projectListProjectInfoContainer">
            <p>Paradiso - Amsterdam</p>
            <Icone SrcIcone={FilledPoint} />
            <p>4 février 2024</p>
          </div>
        </div>
        <div className="projectListProjectContainer projectListProject4Style">
          <div className="projectListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Project} styleType={StyleType.style4} />
            <button className="projectListProjectSelectButton">
              Sélectionner
            </button>
          </div>
          <h3 className="projectListTitleProject">Whothebest</h3>
          <div className="projectListProjectInfoContainer">
            <p>Orion Arena - Rome</p>
            <Icone SrcIcone={FilledPoint} />
            <p>17 Décembre 2023</p>
          </div>
        </div>
      </div>
      <NextButton
        nav={-1}
        type="button"
        styleClassName="btnStyle11"
        mainClassName="projectListExitButton"
        text="Quitter"
      />
    </div>
  );
}
