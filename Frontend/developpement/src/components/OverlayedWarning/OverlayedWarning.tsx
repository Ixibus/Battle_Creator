import { useEffect } from "react";
import "./overlayedWarning.css";

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../Button/NextButton/buttonsContainerStyle.css";

import NextButton from "../Button/NextButton/NextButton";

interface TaskToBeDeleted {
  id?: number;
  taskName: string;
}

interface OverlayedWarningProps {
  taskToBeDeleted?: TaskToBeDeleted;
  onDeleteTask: () => void;
  onClose: () => void;
}

export default function OverlayedWarning({
  taskToBeDeleted,
  onDeleteTask,
  onClose,
}: OverlayedWarningProps) {
  // Gestion de la fermeture avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="overlayedWarningOverlayStyle"
      onClick={onClose} // Ferme si on clique en dehors de la boîte modale
    >
      <div
        className="overlayedWarningContainerStyle"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-warning-title"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors du clic à l'intérieur
      >
        <div className="inputsFormContainerStyle3">
          <p id="modal-warning-title" className="overlayedWarningMessage">
            {`Voulez-vous effacer définitivement la tâche "${taskToBeDeleted?.taskName}" ?`}
          </p>
          <div className="buttonsContainerStyle2">
            <NextButton
              type="button"
              styleClassName="btnStyle16"
              mainClassName="SubmitBtn_AddingTaskPage"
              text="Effacer la tâche"
              onClick={onDeleteTask}
            />
            <NextButton
              type="button"
              styleClassName="btnStyle17"
              mainClassName="LeaveBtn_AddingTaskPage"
              text="Annuler"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}