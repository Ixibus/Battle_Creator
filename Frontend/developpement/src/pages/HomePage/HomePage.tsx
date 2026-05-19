import Figure2 from "../../components/Figure/Figure2";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";
import SecondaryThumbnail from "../../components/SecondaryThumbnail/SecondaryThumbnail";

import "./homePageStyle.css";

import checked from "../../assets/icones/checked.svg";
import members from "../../assets/icones/members.svg";
import tools from "../../assets/icones/tools.svg";

export default function HomePage() {
  return (
    <div className="homePageContainer">
      <div className="homePageProjectTitleContainer">
        <h1 className="homePageProjectTitle">Battle Infinity</h1>
      </div>
      <div className="homePageFigureContainer">
        <Figure2 number={60} symbol="%" />
      </div>
      <main className="homePageMainContainer">
        <MissionTagsThumbnail
          title="Missions obligatoires"
          isOptional={false}
        />
        <MissionTagsThumbnail title="Missions optionnelles" isOptional={true} />
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
