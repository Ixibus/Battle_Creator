import MissionTagsContainer from "./MissionTagsContainer";
import MissionTagTitle from "./MissionTagTitle";

import './missionTagsThumbnailStyle.css';
import PlusButton from "../Button/PlusButton/PlusButton";

interface propsInterface {
    title : string,
    isOptional : boolean
}

export default function MissionTagsThumbnail({title, isOptional} : propsInterface) {
  return (
    <div className="missionTagsThumbnail missionTagsThumbnailStyle">
      <MissionTagTitle title={title}/>
      <MissionTagsContainer isOptional={isOptional}/>
    </div>
  );
}
