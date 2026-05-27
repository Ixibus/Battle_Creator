import Icone, { StyleType } from "../../Icones/Icone";
import Plus from "../../../assets/icones/plus.svg?react";

import "../../../styles/global/btnStyle.css";
// import "../style/buttonContainerStyle.css";
import "../PlusButton/plusButtonStyle.css";

interface interfaceProps {
  topMarginButton: string;
  btnStyle: string;
  mainClassName: string;
  text?: string;
}

export default function PlusButton({
  topMarginButton,
  btnStyle,
  mainClassName,
  text,
}: interfaceProps) {
  return (
    <div className={"buttonContainerStyle"} style={{marginTop:`${topMarginButton}`}}>
      <button
        className={`button plusButtonContainerStyle ${btnStyle} ${mainClassName}`}
      >
        <Icone SrcIcone={Plus} styleType={StyleType.style5}/>
        {text}
      </button>
    </div>
  );
}
