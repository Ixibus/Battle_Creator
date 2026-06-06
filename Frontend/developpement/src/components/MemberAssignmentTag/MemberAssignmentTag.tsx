import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Assign from '../../assets/icones/assign.svg?react';
import "./memberAssignmentTagStyle.css";
import { useNavigate } from "react-router-dom";

interface interfaceProps {
  mainClassName: string;
  memberName: string;
}

export default function MemberAssignmentTag({
  mainClassName,
  memberName,
}: interfaceProps) {

  const navigate = useNavigate();

  function navTaskAssignmentPage() {
    navigate("/taskAssignmentPage");
  }


  return (
    <span className={`assignmentTagStyleContainer btnStyle15 ${mainClassName}`} onClick={navTaskAssignmentPage}>
      <p className="assignmentTagText">{memberName}</p>
      <Icone SrcIcone={Assign} styleType={StyleType.style8}/>
    </span>
  );
}
