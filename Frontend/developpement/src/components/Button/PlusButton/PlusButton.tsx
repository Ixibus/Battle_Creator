import Icone, { StyleType } from "../../Icones/Icone";
import Plus from "../../../assets/icones/plus.svg?react";

import "../../../styles/global/btnStyle.css";
// import "../style/buttonContainerStyle.css";
import "../PlusButton/plusButtonStyle.css";
import { useNavigate } from "react-router-dom";

interface interfaceProps {
  nav?: string;
  topMarginButton: string;
  btnStyle: string;
  mainClassName: string;
  text?: string;
  onClick?: () => void;
}

export default function PlusButton({
  nav,
  topMarginButton,
  btnStyle,
  mainClassName,
  text,
  onClick
}: interfaceProps) {

  const navigate = useNavigate();
  
    const handleClick = () => {
      if (onClick) {
        onClick();
        return;
      }
      if (nav) navigate(nav);
  };

  return (
    <div className={"buttonContainerStyle"} style={{marginTop:`${topMarginButton}`}} onClick={handleClick}>
      <button
        className={`button plusButtonContainerStyle ${btnStyle} ${mainClassName}`}
      >
        <Icone SrcIcone={Plus} styleType={StyleType.style5}/>
        {text}
      </button>
    </div>
  );
}
