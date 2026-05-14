import PlusButton from "../Button/PlusButton/PlusButton";
import MissionTag from "../MissionTag/MissionTag";

import "./missionTagsContainerStyle.css";

type propType = { isOptional : boolean};

const defaultMissionArray = ["MC", "Ticketterie", "Juges", "DJ", "Planning event", "Système son", "Phases des battles"];

let optionalMissionsArray = ["Communication évènement",
"Vestiaires",
"Matériels d'ambiance",
"Signalétiques",
"Matériels participants",
"Personnel d'encadrement",
"Collation juge"];

export default function MissionTagsContainer({isOptional} : propType) {
  return (
      <div className="missionTagsContainer missionTagsContainerStyle">
        { !isOptional ? defaultMissionArray.map((mission) => <MissionTag text={mission}/>) : 
          optionalMissionsArray.map((mission) => (<MissionTag text={mission}/>)
        ) }
        <PlusButton/>
      </div>
  );
}
