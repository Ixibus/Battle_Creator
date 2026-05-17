import '../../styles/global/btnStyle.css';

import NextButton from "../Button/NextButton/NextButton";
import Figure from "../Figure/Figure";

import './infoThumbnailStyle.css';

interface propInterface {
  title: string,
  displayFigure: boolean,
  figure?: number,
  optionalfigureSymbol?: string,
  nextButtonPhrase: string,
}

export default function InfoThumbnail({title, displayFigure, figure, optionalfigureSymbol, nextButtonPhrase} : propInterface) {
  return (
    <div className="infoThumbnailStyle">
      <h3>{title}</h3>
      { displayFigure && <Figure number={figure} symbol={optionalfigureSymbol}/>}
      <NextButton styleClassName="btnStyle4" mainClassName="seeMoreList" text={nextButtonPhrase}/>
    </div>
  );
}
