import "../../styles/global/btnStyle.css";
import Icone, { StyleType } from "../Icones/Icone";
import Assign from "../../assets/icones/assign.svg?react";
import "./memberAssignmentTagStyle.css";

interface InterfaceProps {
  mainClassName: string;
  memberName: string;
  onClick: () => void;
  assignStyleTag: boolean;
}

export default function MemberAssignmentTag({
  mainClassName,
  memberName,
  onClick,
  assignStyleTag,
}: InterfaceProps) {
  return (
    <button
      type="button"
      className={`assignmentTagStyleContainer ${
        assignStyleTag ? "btnStyle19" : "btnStyle18"
      } ${mainClassName}`}
      onClick={onClick}
      aria-label={
        assignStyleTag
          ? `Bénévole assigné : ${memberName}. Cliquer pour modifier.`
          : `Assigner un bénévole à cette tâche`
      }
      style={{ border: "none", cursor: "pointer", textAlign: "left" }}
    >
      <span className={assignStyleTag ? "assignedTaskTagText" : "assignmentTagText"}>
        {memberName}
      </span>
      {!assignStyleTag && (
        <Icone SrcIcone={Assign} styleType={StyleType.style8} aria-hidden="true" />
      )}
    </button>
  );
}