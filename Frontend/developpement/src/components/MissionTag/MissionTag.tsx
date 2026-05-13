import './missionTagStyle.css';

type propType = {text : string};

export default function MissionTag({text} : propType) {
    return(
        <div className="missionTag missionTagStyle">
            <p>{text}</p>
        </div>
    )
}