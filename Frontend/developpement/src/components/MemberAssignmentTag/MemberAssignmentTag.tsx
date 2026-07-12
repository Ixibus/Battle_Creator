import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Assign from '../../assets/icones/assign.svg?react';
import "./memberAssignmentTagStyle.css";

interface interfaceProps {
  mainClassName: string;
  memberName: string;
  onClick: () => void;
  assignStyleTag: boolean
}

export default function MemberAssignmentTag({
  mainClassName,
  memberName,
  onClick,
  assignStyleTag
}: interfaceProps) {

  return (
    <>{assignStyleTag ? (<span className={`assignmentTagStyleContainer btnStyle19 ${mainClassName}`} onClick={onClick}>
      <p className="assignedTaskTagText">{memberName}</p>
    </span>) : (<span className={`assignmentTagStyleContainer btnStyle18 ${mainClassName}`} onClick={onClick}>
      <p className="assignmentTagText">{memberName}</p>
      <Icone SrcIcone={Assign} styleType={StyleType.style8}/>
    </span>)
    }
    </>
  );
}
