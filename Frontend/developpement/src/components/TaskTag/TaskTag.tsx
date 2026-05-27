import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Checked from "../../assets/icones/checked.svg?react";
import Bin from "../../assets/icones/bin.svg?react";
import "./taskTagStyle.css";

interface interfaceProps {
  btnStyle: string;
  mainClassName: string;
  text: string;
}

export default function TaskTag({
  btnStyle,
  mainClassName,
  text,
}: interfaceProps) {
  return (
    <span className={`taskTagStyleContainer ${btnStyle} ${mainClassName}`}>
      <p className="taskTagTitle">{text}</p>
      <Icone SrcIcone={Checked} styleType={StyleType.style6} />
      <Icone SrcIcone={Bin} styleType={StyleType.style7} />
    </span>
  );
}
