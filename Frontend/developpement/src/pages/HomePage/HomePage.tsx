import Figure from "../../components/Figure/Figure";
import InfoThumbnail from "../../components/InfoThumbnail/InfoThumbnail";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";

import './homePageStyle.css'

export default function HomePage() {
  return (
    <div>
      <header>
        <div className="homePageTitleContainer">
          <h1>Battle Infinity</h1>
          <Figure number={60} symbol="%" />
        </div>
        <div className="homePageInfoThumbnailContainer">
            <InfoThumbnail  title="Nombre de tâches" displayFigure={true} figure={34} nextButtonPhrase="voir toutes les tâches"/>
            <InfoThumbnail  title="Nombre de bénévoles" displayFigure={true} figure={15} nextButtonPhrase="voir la liste des membres"/>
            <InfoThumbnail title="Matériels" displayFigure={false} nextButtonPhrase="voir la liste"/>
        </div>
      </header>
      <main className="homePageMainContainer">
        <MissionTagsThumbnail title="Missions obligatoires" isOptional={false}/>
        <MissionTagsThumbnail title="Missions optionnelles" isOptional={true}/>
      </main>
    </div>
  );
}
