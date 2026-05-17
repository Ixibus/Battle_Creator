import Figure2 from "../../components/Figure/Figure2";
import InfoThumbnail from "../../components/InfoThumbnail/InfoThumbnail";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";

import "./homePageStyle.css";

export default function HomePage() {
  return (
    <div className="homePageContainer">
      <header className="homePageHeaderContainer">
        <div className="homePageNicknameTitleContainer">
          <p className="homePageNicknameTitle">Hello Nico</p>
        </div>
        <div className="homePageProjectTitleContainer">
          <h1 className="homePageProjectTitle">Battle Infinity</h1>
          <Figure2 number={60} symbol="%" />
        </div>
      </header>
      <div className="homePageInfoThumbnailContainer">
        <InfoThumbnail
          title="Nombre de tâches"
          displayFigure={true}
          figure={34}
          nextButtonPhrase="voir toutes les tâches"
        />
        <InfoThumbnail
          title="Nombre de bénévoles"
          displayFigure={true}
          figure={15}
          nextButtonPhrase="voir la liste des membres"
        />
      </div>
      <main className="homePageMainContainer">
        <MissionTagsThumbnail
          title="Missions obligatoires"
          isOptional={false}
        />
        <MissionTagsThumbnail title="Missions optionnelles" isOptional={true} />
      </main>
    </div>
  );
}
