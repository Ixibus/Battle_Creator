import "./addingTaskPage.css";

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/formError.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";

import AreaTextContainer, {
  AreaLabelStyle,
  AreaTextStyle,
} from "../../components/InputContainer/AreaTextContainer";

import NextButton from "../../components/Button/NextButton/NextButton";

import { useToastStore } from "../../store/toastStore";

interface AddingTaskPageProps {
  onClose: () => void;
  missionId: number;
  onTaskCreated: () => void | Promise<void>;
}

export default function AddingTaskPage({
  onClose,
  missionId,
  onTaskCreated,
}: AddingTaskPageProps) {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isLeaderTask, setIsLeaderTask] = useState(false);

  const [touched, setTouched] = useState<{
    taskName: boolean;
    taskDescription: boolean;
  }>({
    taskName: false,
    taskDescription: false,
  });

  const showToast = useToastStore((state) => state.showToast);

  const isTaskNameEmpty = taskName.trim() === "";
  const isTaskDescriptionEmpty = taskDescription.trim() === "";

  const hasError = isTaskNameEmpty || isTaskDescriptionEmpty;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setTouched({
      taskName: true,
      taskDescription: true,
    });

    if (hasError) {
      showToast("Merci de remplir tous les champs obligatoires", "error");
      return;
    }

    const taskData = {
      taskName,
      taskDescription,
      isLeaderTaskCheckbox: isLeaderTask,
      isDone: false,
      idMission: missionId,
    };

    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        showToast(
          "Une erreur est survenue lors de l'ajout de la tâche",
          "error",
        );
        return;
      }

      showToast("La tâche a été ajoutée avec succès", "success");

      await onTaskCreated();
      onClose();
    } catch (error) {
      showToast("Impossible de contacter le serveur", "error");
    }
  }

  function handleClose() {
    setTaskName("");
    setTaskDescription("");
    setIsLeaderTask(false);

    setTouched({
      taskName: false,
      taskDescription: false,
    });

    onClose();
  }

  return (
    <div className="addingTaskPageOverlayStyle" onClick={handleClose}>
      <div className="addingTaskPageStyle" onClick={(e) => e.stopPropagation()}>
        <form className="formStyle2" onSubmit={handleSubmit}>
          <h1 className="titleFormStyle4">AJOUTER UNE TACHE</h1>

          <div className="inputsFormContainerStyle">
            <InputContainer
              inputLabelStyle={InputLabelStyle.style3}
              labelName="Nom de la tâche"
              inputItemStyle={InputItemStyle.style3}
              htmlFor="taskName"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onBlur={() =>
                setTouched((state) => ({
                  ...state,
                  taskName: true,
                }))
              }
              hasError={touched.taskName && isTaskNameEmpty}
            />
            <div className="errorSlot">
              {touched.taskName && isTaskNameEmpty && (
                <p className="formErrorMessageStyle">
                  Merci de renseigner le nom de la tâche
                </p>
              )}
            </div>

            <AreaTextContainer
              htmlFor="taskDescription"
              areaLabelStyle={AreaLabelStyle.style3}
              labelName="Description de la tâche"
              areaTextStyle={AreaTextStyle.style3}
              cols={35}
              rows={2}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              onBlur={() =>
                setTouched((state) => ({
                  ...state,
                  taskDescription: true,
                }))
              }
              hasError={touched.taskDescription && isTaskDescriptionEmpty}
            />

            <div className="errorSlot">
              {touched.taskDescription && isTaskDescriptionEmpty && (
                <p className="formErrorMessageStyle">
                  Merci de renseigner une description de tâche
                </p>
              )}
            </div>

            <div className="addingTaskPageIsLeaderTaskContainer">
              <label
                htmlFor="isLeaderTaskCheckbox"
                className="addingTaskPageIsLeaderTaskCheckboxLabel"
              >
                Statut "Leader" de la tâche
              </label>

              <input
                type="checkbox"
                name="isLeaderTaskCheckbox"
                id="isLeaderTaskCheckbox"
                className="addingTaskPageIsLeaderTaskCheckboxCheckbox"
                checked={isLeaderTask}
                onChange={(e) => setIsLeaderTask(e.target.checked)}
              />
            </div>

            <div className="buttonsContainerStyle">
              <NextButton
                type="submit"
                styleClassName="btnStyle10"
                mainClassName="SubmitBtn_AddingTaskPage"
                text="Valider"
              />

              <NextButton
                type="button"
                styleClassName="btnStyle11"
                mainClassName="LeaveBtn_AddingTaskPage"
                text="Quitter"
                onClick={handleClose}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
