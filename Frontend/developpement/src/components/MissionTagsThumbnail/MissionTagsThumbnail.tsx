import MissionTagsContainer from "./MissionTagsContainer";
import MissionTagTitle from "./MissionTagTitle";

import './missionTagsThumbnailStyle.css';
import PlusButton from "../Button/PlusButton/PlusButton";

interface propsInterface {
    title : string
}

export default function MissionTagsThumbnail({title} : propsInterface) {
  return (
    <div className="missionTagsThumbnail missionTagsThumbnailStyle">
      <MissionTagTitle title={title}/>
      <MissionTagsContainer />
    </div>
  );
}
