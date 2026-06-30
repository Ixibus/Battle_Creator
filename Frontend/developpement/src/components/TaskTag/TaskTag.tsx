import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Checked from "../../assets/icones/checked.svg?react";
import Bin from "../../assets/icones/bin.svg?react";
import "./taskTagStyle.css";

interface interfaceProps {
  mainClassName: string;
  text: string;
  onClick : () => void
}


export default function TaskTag({
  mainClassName,
  text,
  onClick
}: interfaceProps) {
  return (
    <span className={`taskTagStyleContainer btnStyle15 ${mainClassName}`}>
      <p className="taskTagTitle">{text}</p>
      <Icone SrcIcone={Checked} styleType={StyleType.style6} />
      <Icone SrcIcone={Bin} styleType={StyleType.style7} onClick={onClick}/>
    </span>
  );
}
