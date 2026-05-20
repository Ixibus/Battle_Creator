import Figure2 from "../../components/Figure/Figure2";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";
import SecondaryThumbnail from "../../components/SecondaryThumbnail/SecondaryThumbnail";

import "./homePageStyle.css";

import checked from "../../assets/icones/checked.svg";
import members from "../../assets/icones/members.svg";
import tools from "../../assets/icones/tools.svg";
import mandatoryMission from "../../assets/icones/mandatoryMission.svg";
import optionnalMission from "../../assets/icones/optionnalMission.svg";
import filledPoint from "../../assets/icones/filledPoint.svg";

export default function HomePage() {
  return (
    <div className="homePageContainer">
      <div className="homePageProjectTitleContainer">
        <h1 className="homePageProjectTitle">Battle Infinity</h1>
        <div className="homePageProjectInfoContainer">
          <p>CCVA Villeurbanne</p>
          <img src={filledPoint} />
          <p>12 juin 2026</p>
        </div>
      </div>
      <div className="homePageFigureContainer">
        <h2>Progression</h2>
        <Figure2 number={60} symbol="%" />
      </div>
      <main className="homePageMainContainer">
        <MissionTagsThumbnail
          title="Missions obligatoires"
          isOptional={false}
          icone={mandatoryMission}
        />
        <MissionTagsThumbnail
          title="Missions optionnelles"
          isOptional={true}
          icone={optionnalMission}
        />
      </main>
      <div className="secondaryThumbnailsContainer">
        <SecondaryThumbnail
          isFigured={true}
          figure={34}
          text="Tâches"
          icone={checked}
          buttonText="Voir les tâches"
        />
        <SecondaryThumbnail
          isFigured={true}
          figure={15}
          text="Bénévoles"
          icone={members}
          buttonText="Tous les bénévoles"
        />
        <SecondaryThumbnail
          isFigured={false}
          text="Matériels"
          icone={tools}
          buttonText="Liste de tous les matériels"
        />
      </div>
    </div>
  );
}
