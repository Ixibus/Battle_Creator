import "./missionTagsThumbnailStyle.css";
import PlusButton from "../Button/PlusButton/PlusButton";
import MissionTag from "../MissionTag/MissionTag";

interface propsInterface {
  title: string;
  isOptional: boolean;
}

const defaultMissionArray = ["MC", "Ticketterie", "Juges", "DJ", "Planning event", "Système son", "Phases des battles"];

let optionalMissionsArray = ["Communication évènement",
"Vestiaires",
"Matériels d'ambiance",
"Signalétiques",
"Matériels participants",
"Personnel d'encadrement",
"Collation juge"];

export default function MissionTagsThumbnail({
  title,
  isOptional,
}: propsInterface) {
  return (
    <div className="missionThumbnailContainerStyle">
      <h3>Missions obligatoires</h3>
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
