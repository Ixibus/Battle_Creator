import NextButton from '../Button/NextButton/NextButton';
import Figure from '../Figure/Figure';
import Icone from '../Icone/Icone';
import './secondaryThumbnailStyle.css';

interface propInterface {
    isFigured? : boolean,
    figure? : number,
    text : string,
    icone : string,
    buttonText? : string,
};

export default function SecondaryThumbnail({isFigured, figure, text, icone, buttonText} : propInterface) {
    return(
        <div className="secondaryThumbnail secondaryThumbnailStyle">
            {isFigured && <Figure number={figure}/>}
            <p>{text}</p>
            <Icone srcIcone={icone}/>
            <NextButton styleClassName="btnStyle5" mainClassName="tasksButton" text={buttonText}/>
        </div>
    )
}