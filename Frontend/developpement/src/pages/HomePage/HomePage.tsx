import Figure2 from "../../components/Figure/Figure2";
import InfoThumbnail from "../../components/InfoThumbnail/InfoThumbnail";
import MissionTagsThumbnail from "../../components/MissionTagsThumbnail/MissionTagsThumbnail";
import SecondaryThumbnail from "../../components/SecondaryThumbnail/SecondaryThumbnail";

import "./homePageStyle.css";

import checked from '../../assets/icones/checked.svg'
import members from '../../assets/icones/members.svg'
import tools from '../../assets/icones/tools.svg'


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
      <SecondaryThumbnail isFigured= {true} figure={34} text="Tâches" icone={checked}/>
      <SecondaryThumbnail isFigured={true} figure={15} text="Bénévoles" icone={members}/>
      <SecondaryThumbnail isFigured={false} text="Matériels" icone={tools}/>
    </div>
  );
}
