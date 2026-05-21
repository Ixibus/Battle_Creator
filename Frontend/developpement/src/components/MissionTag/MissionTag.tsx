import Icone, {StyleType} from '../Icones/Icone';
import './missionTagStyle.css';

import ForwardArrow from '../../assets/icones/forwardArrow.svg?react'

type propType = {text : string};

export default function MissionTag({text} : propType) {
    return(
        <div className="missionTagStyle">
            <p>{text}</p>
            <Icone SrcIcone={ForwardArrow} styleType={StyleType.style1}/>
        </div>
    )
}