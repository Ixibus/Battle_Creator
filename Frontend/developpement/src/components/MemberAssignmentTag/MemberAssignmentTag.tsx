import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Assign from '../../assets/icones/assign.svg?react';
import "./memberAssignmentTagStyle.css";

interface interfaceProps {
  mainClassName: string;
  memberName: string;
  onClick: () => void;
}

export default function MemberAssignmentTag({
  mainClassName,
  memberName,
  onClick
}: interfaceProps) {

  return (
    <span className={`assignmentTagStyleContainer btnStyle15 ${mainClassName}`} onClick={onClick}>
      <p className="assignmentTagText">{memberName}</p>
      <Icone SrcIcone={Assign} styleType={StyleType.style8}/>
    </span>
  );
}
