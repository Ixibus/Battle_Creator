import Icone from '../Icone/Icone';
import './missionTagStyle.css';

import forwardArrow from '../../assets/icones/forwardArrow.svg'

type propType = {text : string};

export default function MissionTag({text} : propType) {
    return(
        <div className="missionTagStyle">
            <p>{text}</p>
            <Icone srcIcone={forwardArrow}/>
        </div>
    )
}