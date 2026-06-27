import "./addingTaskPage.css";

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";
import AreaTextContainer, {
  AreaLabelStyle,
  AreaTextStyle,
} from "../../components/InputContainer/AreaTextContainer";
import NextButton from "../../components/Button/NextButton/NextButton";
import DateInputContainer from "../../components/InputContainer/DateInputContainer";
import { useNavigate } from "react-router-dom";

export default function AddingTaskPage() {
  const navigate = useNavigate();
  async function handlesubmit(e: any) {
    e.preventDefault();


    const form = new FormData(e.currentTarget);

    const formEntries = {
      taskName : form.get("taskName"),
      taskDescription : form.get("taskDescription"),
      isLeaderTaskCheckbox : form.get("isLeaderTaskCheckbox") === "on",
      isDone : false,
    }

    console.log(formEntries);

    const res = await fetch("http://localhost:8080/tasks",
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formEntries),
      }
    );


    const text = await res.text();

    if (res.status !== 201) console.log("l'ajout de tâche a échoué " + res.status);

    if (res.status === 201) console.log("ajout de tâche réussi 🥳");

    console.log('ok')
    // navigate("/missionPage");
  }
  return (
    <div className="addingTaskPageStyle">
      <form className="formStyle2" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle4">AJOUTER UNE TACHE</h1>
        <div className="inputsFormContainerStyle">
          <InputContainer
            inputLabelStyle={InputLabelStyle.style3}
            labelName="Nom de la tâche"
            inputItemStyle={InputItemStyle.style3}
            htmlFor="taskName"
            type="text"
          />
          <AreaTextContainer
            htmlFor="taskDescription"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Description de la tâche"
            areaTextStyle={AreaTextStyle.style3}
            cols={35}
            rows={2}
          />
          <div className="addingTaskPageIsLeaderTaskContainer">
            <label
              htmlFor="isLeaderTaskCheckbox"
              className="addingTaskPageIsLeaderTaskCheckboxLabel"
            >
              Statut "Leader" de la Tache
            </label>
            <input
              type="checkbox"
              name="isLeaderTaskCheckbox"
              id="isLeaderTaskCheckbox"
              className="addingTaskPageIsLeaderTaskCheckboxCheckbox"
            />
          </div>
          {/* <div className="addingTaskPageLinkingTasksContainer">
            <p className="addingTaskPageLinkingTasksTitle">Liaison de tâche</p>
            <div className="addingTaskPageLinkingTasksInnerContainer">
              <div className="addingTaskPageLinkingPreviousTaskContainer">
                <label htmlFor="addingTaskPageLinkingPreviousTaskLabel">
                  Selection tâche précédente :
                </label>
                <select
                  name="addingTaskPageLinkingPreviousTaskLabel"
                  className="addingTaskPageLinkingPreviousTaskSelect"
                  id=""
                >
                  <option value="">--Tâche(s) disponible(s)--</option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
              <div className="addingTaskPageLinkingNextTaskContainer">
                <label htmlFor="addingTaskPageLinkingNextTaskLabel">
                  Selection tâche suivante :
                </label>
                <select
                  name="addingTaskPageLinkingNextTaskLabel"
                  className="addingTaskPageLinkingNextTaskSelect"
                  id=""
                >
                  <option value="">--Tâche(s) disponible(s)--</option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div> */}
          <div className="buttonsContainerStyle">
            <NextButton
              type="submit"
              styleClassName="btnStyle10"
              mainClassName="SubmitBtn_AddingTaskPage"
              text="Valider"
            />
            <NextButton
              nav={-1}
              type="button"
              styleClassName="btnStyle11"
              mainClassName="LeaveBtn_AddingTaskPage"
              text="Quitter"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
