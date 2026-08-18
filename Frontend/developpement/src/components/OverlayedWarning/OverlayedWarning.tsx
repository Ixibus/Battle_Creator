import "./overlayedWarning.css";

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../Button/NextButton/buttonsContainerStyle.css";

import NextButton from "../Button/NextButton/NextButton";

export default function OverlayedWarning({ taskToBeDeleted, onDeleteTask, onClose }: any) {
  return (
    <div className="overlayedWarningOverlayStyle">
      <div className="overlayedWarningContainerStyle">
        <div className="inputsFormContainerStyle3">
          <p className="overlayedWarningMessage">{`Voulez-vous effacer définitivement la tâche "${taskToBeDeleted.taskName}"`}</p>
          <div className="buttonsContainerStyle2">
            <NextButton
              type="button"
              styleClassName="btnStyle16"
              mainClassName="SubmitBtn_AddingTaskPage"
              text="Effacer la tâche"
              onClick={onDeleteTask}
            />
            <NextButton
              nav={-1}
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
