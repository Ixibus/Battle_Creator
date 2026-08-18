import Figure2 from "../../components/Figure/Figure2";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";
import SecondaryThumbnail from "../../components/SecondaryThumbnail/SecondaryThumbnail";

import "./homePageStyle.css";

import Checked from "../../assets/icones/checked.svg?react";
import Members from "../../assets/icones/members.svg?react";
import Tools from "../../assets/icones/tools.svg?react";
import MandatoryMission from "../../assets/icones/mandatoryMission.svg?react";
import OptionnalMission from "../../assets/icones/optionnalMission.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";
import Icone from "../../components/Icones/Icone";

import { useProjectStore } from "../../store/useProjectStore";
import { formatDateFr } from "../../utils/toFrenchDateFormat";
import { useState } from "react";
import AddingMissionPage from "../AddingMissionPage/AddingMissionPage";
import NextButton from "../../components/Button/NextButton/NextButton";

export default function HomePage() {
  const { selectedProject } = useProjectStore();
  const [showAddingMissionPage, setShowAddingMissionPage] =
    useState<Boolean>(false);

  return (
    <div
      className={
        showAddingMissionPage
          ? "homePageContainer homePageBackgroundForOverlay"
          : "homePageContainer"
      }
    >
      <div className="homePageProjectContainer">
        <div className="homePageProjectTitleAndInfoContainer">
          <h1 className="homePageProjectTitle">
            {selectedProject?.name || "Aucun projet sélectionné"}
          </h1>
          <div className="homePageProjectInfoContainer">
            <p>{selectedProject?.location}</p>
            <Icone SrcIcone={FilledPoint} />
            <p>
              {formatDateFr(selectedProject?.projectDate) ||
                "Aucun projet sélectionné"}
            </p>
          </div>
        </div>
        <div className="homePageProjectTitleProjectDetailsContainer">
          <NextButton type="button" styleClassName="btnStyle21" mainClassName="homePageProjectContainerDetailsButton" text="Détails"/>
        </div>
        <div className="homePageProjectTitleProjectDeletionContainer">
          <NextButton type="button" styleClassName="btnStyle22" mainClassName="homePageProjectContainerDetailsButton" text="Supprimer"/>
        </div>
      </div>
      <div className="homePageFigureContainer">
        <h2 className="homePageFigureProgressionText">PROGRESSION</h2>
        <Figure2 number={60} symbol="%" />
      </div>
      <main className="homePageMainContainer">
        <MissionTagsThumbnail
          title="MISSIONS OBLIGATOIRES"
          isOptional={false}
          icone={MandatoryMission}
        />
        <MissionTagsThumbnail
          title="MISSIONS OPTIONNELLES"
          isOptional={true}
          icone={OptionnalMission}
          onClick={() => {
          setShowAddingMissionPage(true);
        }}
        />
      </main>
      <div className="secondaryThumbnailsContainer">
        <SecondaryThumbnail
          isFigured={true}
          figure={34}
          text="Tâches"
          icone={Checked}
          buttonText="VOIR LES TACHES"
        />
        <SecondaryThumbnail
          isFigured={true}
          figure={15}
          text="Bénévoles"
          icone={Members}
          buttonText="TOUS LES BENEVOLES"
        />
        <SecondaryThumbnail
          isFigured={false}
          text="Matériels"
          icone={Tools}
          buttonText="VOIR LA LISTE"
        />
      </div>
      {showAddingMissionPage && (
        <AddingMissionPage
          onClose={() => {
            setShowAddingMissionPage(false);
          }}
        />
      )}
    </div>
  );
}
