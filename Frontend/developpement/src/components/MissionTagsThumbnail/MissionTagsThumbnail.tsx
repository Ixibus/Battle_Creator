import "./missionTagsThumbnailStyle.css";
import "../MissionTag/missionTagStyle.css"
import "../../styles/global/marginTitle.css";


import MissionTag from "../MissionTag/MissionTag";
import Icone, {StyleType} from "../Icones/Icone";
import NextButton from "../Button/NextButton/NextButton";
import PlusButton from "../Button/PlusButton/PlusButton";


interface propsInterface {
  title: string;
  isOptional: boolean;
  icone: React.FC<React.SVGProps<SVGSVGElement>>,
}

const defaultMissionArray = [
  "MC",
  "Ticketterie",
  "Juges",
  "DJ",
  "Planning event",
  "Système son",
  "Phases des battles",
];

let optionalMissionsArray = [
  "Communication évènement",
  "Vestiaires",
  "Matériels d'ambiance",
  "Signalétiques",
  "Matériels participants",
  "Personnel d'encadrement",
  "Collation juge",
];

export default function MissionTagsThumbnail({
  title,
  isOptional,
  icone
}: propsInterface) {
  return (
    <div className="missionThumbnailContainerStyle">
      <div className="missionThumbnailTitleContainerStyle">
        <h3>{title}</h3>
        <Icone SrcIcone={icone} styleType={StyleType.style1}/>
      </div>
      {!isOptional
        ? defaultMissionArray.map((mission) => (
            <MissionTag key={mission} text={mission} styleClassName="missionTagStyle" />
          ))
        : 
          <div style={{height:"100%", display:"flex",flexDirection:"column", gap:"10px"}}>
            {optionalMissionsArray.map((mission) => (
            <MissionTag key={mission} text={mission} styleClassName="missionTagStyle2"/>
          ))
          }
          <PlusButton btnStyle="btnStyle12" mainClassName="optionnalMissionNextButton" text="AJOUTER MISSION" topMarginButton="auto"/>
          </div>
          }
    </div>
  );
}
