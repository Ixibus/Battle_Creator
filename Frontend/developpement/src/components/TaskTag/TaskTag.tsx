import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Checked from "../../assets/icones/checked.svg?react";
import Bin from "../../assets/icones/bin.svg?react";
import "./taskTagStyle.css";

interface interfaceProps {
  mainClassName: string;
  text: string;
  onClickFirstButton : () => void;
  onClickSecondButton : () => void
}


export default function TaskTag({
  mainClassName,
  text,
  onClickFirstButton,
  onClickSecondButton
}: interfaceProps) {
  return (
    <span className={`taskTagStyleContainer btnStyle15 ${mainClassName}`}>
      <p className="taskTagTitle">{text}</p>
      <Icone SrcIcone={Checked} styleType={StyleType.style6} onClick={onClickFirstButton} />
      <Icone SrcIcone={Bin} styleType={StyleType.style7} onClick={onClickSecondButton}/>
    </span>
  );
}
