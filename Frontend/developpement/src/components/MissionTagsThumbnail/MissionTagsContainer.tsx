import PlusButton from "../Button/PlusButton/PlusButton";
import MissionTag from "../MissionTag/MissionTag";

import "./missionTagsContainerStyle.css";

export default function MissionTagsContainer() {
  return (
      <div className="missionTagsContainer missionTagsContainerStyle">
        <MissionTag text="Espace" />
        <MissionTag text="MC" />
        <MissionTag text="Ticketterie" />
        <MissionTag text="Juges" />
        <MissionTag text="DJ" />
        <MissionTag text="Planning event" />
        <MissionTag text="Système son" />
        <MissionTag text="Phases des battles" />
        <PlusButton/>
      </div>
  );
}
