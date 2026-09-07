import "../../styles/global/btnStyle.css";
import "../../styles/global/colors.css";
import Icone, { StyleType } from "../Icones/Icone";
import Checked from "../../assets/icones/checked.svg?react";
import Bin from "../../assets/icones/bin.svg?react";
import "./taskTagStyle.css";
import { useState } from "react";

interface InterfaceProps {
  mainClassName: string;
  text: string;
  onClickSecondButton: () => void;
}

export default function TaskTag({
  mainClassName,
  text,
  onClickSecondButton,
}: InterfaceProps) {
  const [isFirstButton, setIsFirstButton] = useState<boolean>(false);

  return (
    <div
      className={`taskTagStyleContainer btnStyle15 ${
        isFirstButton ? "taskTagCheckedTaskBackground" : ""
      } ${mainClassName}`}
    >
      <p className={`taskTagTitle ${isFirstButton ? "taskTagCheckedTitle" : ""}`}>
        {text}
      </p>

      {/* Bouton pour marquer la tâche comme terminée */}
      <button
        type="button"
        className="firstButtonForChecking"
        aria-pressed={isFirstButton}
        aria-label={isFirstButton ? `Marquer "${text}" comme non terminée` : `Marquer "${text}" comme terminée`}
        onClick={() => setIsFirstButton(!isFirstButton)}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <Icone
          SrcIcone={Checked}
          styleType={`${StyleType.style6} ${
            isFirstButton ? "taskTagCheckedZindexCheckedIcone" : ""
          }`}
          aria-hidden="true"
          />
      </button>

      {/* Bouton pour supprimer la tâche */}
      <button
        type="button"
        className="secondButtonForDeleting"
        aria-label={`Supprimer la tâche "${text}"`}
        onClick={onClickSecondButton}
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <Icone
          SrcIcone={Bin}
          styleType={`${StyleType.style7} ${
            isFirstButton ? "taskTagCheckedZindexBinIcone" : ""
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}