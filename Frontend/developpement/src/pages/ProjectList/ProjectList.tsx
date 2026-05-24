import NextButton from "../../components/Button/NextButton/NextButton";
import Icone from "../../components/Icones/Icone";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import "./ProjectList.css";

export default function ProjectList() {
  return (
    <div className="projectListContainer">
      <div className="projectListGreetingContainer">
        <p className="projectListGreetingtext">Nico</p>
        <div className="projectListNicoPpStyle" />
      </div>
      <h2>Vos projets</h2>
      <div className="projectListProjectsContainer">
        <div className="projectListProjectContainer">
          <h3 className="projectListTitleproject">Battle Infinity</h3>
          <div className="projectListProjectInfoContainer">
            <p>CCVA Villeurbanne</p>
            <Icone SrcIcone={FilledPoint} />
            <p>12 juin 2026</p>
          </div>
        </div>
        <div className="projectListProjectContainer">
          <h3 className="projectListTitleproject">Flavorous</h3>
          <div className="projectListProjectInfoContainer">
            <p>Champ de Foire - Saint-André-de-Cubzac</p>
            <Icone SrcIcone={FilledPoint} />
            <p>10 août 2025</p>
          </div>
        </div>
        <div className="projectListProjectContainer">
          <h3 className="projectListTitleproject">Summer dance</h3>
          <div className="projectListProjectInfoContainer">
            <p>Paradiso - Amsterdam</p>
            <Icone SrcIcone={FilledPoint} />
            <p>4 février 2024</p>
          </div>
        </div>
        <div className="projectListProjectContainer">
          <h3 className="projectListTitleproject">Whothebest</h3>
          <div className="projectListProjectInfoContainer">
            <p>Orion Arena - Rome</p>
            <Icone SrcIcone={FilledPoint} />
            <p>17 Décembre 2023</p>
          </div>
        </div>
      </div>
      <NextButton
        type="submit"
        styleClassName="btnStyle10"
        mainClassName="projectListExitButton"
        text="Quitter"
      />
    </div>
  );
}
