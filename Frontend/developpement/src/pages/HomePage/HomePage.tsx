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
    useState<boolean>(false);

  const projectName = selectedProject?.name || "Aucun projet sélectionné";

  return (
    <div
      className={
        showAddingMissionPage
          ? "homePageContainer homePageBackgroundForOverlay"
          : "homePageContainer"
      }
    >
      <main className="homePageContainer">
        <section className="homePageProjectContainer" aria-label="Informations du projet">
          <div className="homePageProjectTitleAndInfoContainer">
            <h1 className="homePageProjectTitle">
              {projectName}
            </h1>
            <div className="homePageProjectInfoContainer">
              <p>{selectedProject?.location}</p>
              <Icone SrcIcone={FilledPoint} aria-hidden="true" />
              <p>
                {formatDateFr(selectedProject?.projectDate) ||
                  "Aucun projet sélectionné"}
              </p>
            </div>
          </div>
          <div className="homePageProjectTitleProjectDetailsContainer">
            <NextButton
              type="button"
              styleClassName="btnStyle21"
              mainClassName="homePageProjectContainerDetailsButton"
              text="Détails"
              ariaLabel={`Voir les détails du projet ${projectName}`}
            />
          </div>
          <div className="homePageProjectTitleProjectDeletionContainer">
            <NextButton
              type="button"
              styleClassName="btnStyle22"
              mainClassName="homePageProjectContainerDetailsButton"
              text="Supprimer"
              ariaLabel={`Supprimer le projet ${projectName}`}
            />
          </div>
        </section>

        <section className="homePageFigureContainer" aria-label="Progression du projet">
          <h2 className="homePageFigureProgressionText">PROGRESSION</h2>
          <Figure2 number={60} symbol="%" />
        </section>

        <section className="homePageMainContainer" aria-label="Missions du projet">
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
        </section>

        <section className="secondaryThumbnailsContainer" aria-label="Ressources du projet">
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
        </section>
      </main>

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