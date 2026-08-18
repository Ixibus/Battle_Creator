import NextButton from '../Button/NextButton/NextButton';
import Figure from '../Figure/Figure';
import Icone, {StyleType} from '../Icones/Icone';
import './secondaryThumbnailStyle.css';

interface propInterface {
    isFigured? : boolean,
    figure? : number,
    text : string,
    icone : React.FC<React.SVGProps<SVGSVGElement>>,
    buttonText? : string,
};



export default function SecondaryThumbnail({isFigured, figure, text, icone, buttonText} : propInterface) {
    console.log(icone);
    return(
        <div className="secondaryThumbnail secondaryThumbnailStyle">
            {isFigured && <Figure number={figure}/>}
            <p className="secondaryThumbnailTitleStyle">{text}</p>
            <Icone SrcIcone={icone} styleType={StyleType.style1}/>
            <NextButton styleClassName="btnStyle6" mainClassName="tasksButton" text={buttonText}/>
        </div>
    )
}