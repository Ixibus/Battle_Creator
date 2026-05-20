import "./missionTagsThumbnailStyle.css";
import "../../styles/global/marginTitle.css";

import MissionTag from "../MissionTag/MissionTag";
import Icone, {StyleType} from "../Icones/Icone";


interface propsInterface {
  title: string;
  isOptional: boolean;
  icone: string
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
        <Icone srcIcone={icone} styleType={StyleType.style1}/>
      </div>
      {!isOptional
        ? defaultMissionArray.map((mission) => (
            <MissionTag key={mission} text={mission} />
          ))
        : optionalMissionsArray.map((mission) => (
            <MissionTag key={mission} text={mission} />
          ))}
    </div>
  );
}
