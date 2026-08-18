import "../../styles/global/btnStyle.css";
import "../../styles/global/colors.css";
import Icone, { StyleType } from "../Icones/Icone";
import Checked from "../../assets/icones/checked.svg?react";
import Bin from "../../assets/icones/bin.svg?react";
import "./taskTagStyle.css";
import { useState } from "react";

interface interfaceProps {
  mainClassName: string;
  text: string;
  onClickSecondButton : () => void
}


export default function TaskTag({
  mainClassName,
  text,
  onClickSecondButton
}: interfaceProps) {

  const [isFirstButton, setIsFirstButton] = useState<Boolean>(false);

  // console.log(is)
  return (
    <span className={`taskTagStyleContainer btnStyle15 ${isFirstButton && "taskTagCheckedTaskBackground"} ${mainClassName}`}>
      <p className={`taskTagTitle ${isFirstButton && "taskTagCheckedTitle"} `}>{text}</p>
      <Icone SrcIcone={Checked} styleType={`${StyleType.style6} ${isFirstButton && "taskTagCheckedZindexCheckedIcone"}` } onClick={() => setIsFirstButton(!isFirstButton)}/>
      <Icone SrcIcone={Bin} styleType={`${StyleType.style7} ${isFirstButton && "taskTagCheckedZindexBinIcone"}` } onClick={onClickSecondButton}/>
    </span>
  );
}
