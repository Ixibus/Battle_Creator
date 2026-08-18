import Icone, {StyleType} from '../Icones/Icone';
import './missionTagStyle.css';

import ForwardArrow from '../../assets/icones/forwardArrow.svg?react'

interface propInterface {
    text : string;
    styleClassName? : string;
};

export default function MissionTag({text, styleClassName} : propInterface) {
    return(
        <div className={styleClassName}>
            <p>{text}</p>
            <Icone SrcIcone={ForwardArrow} styleType={StyleType.style1}/>
        </div>
    )
}