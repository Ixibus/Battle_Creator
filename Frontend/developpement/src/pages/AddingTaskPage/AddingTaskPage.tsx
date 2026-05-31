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

async function handlesubmit(e: any) {
  e.preventDefault();
}

export default function AddingTaskPage() {
  return (
    <div className="addingTaskPageStyle">
      <form className="formStyle2" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle4">AJOUTER UNE TACHE</h1>
        <div className="inputsFormContainerStyle">
          <InputContainer
            inputLabelStyle={InputLabelStyle.style3}
            labelName="Nom de la tâche"
            inputItemStyle={InputItemStyle.style3}
            htmlFor="misionName"
            type="text"
          />
          <AreaTextContainer
            htmlFor="missionGoal"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Description de la tâche"
            areaTextStyle={AreaTextStyle.style3}
            cols={35}
            rows={2}
          />
          <div className="addingTaskPageIsLeaderTaskContainer">
            <label
              htmlFor="IsLeaderTaskCheckbox"
              className="addingTaskPageIsLeaderTaskCheckboxLabel"
            >
              Statut "Leader" de la Tache
            </label>
            <input
              type="checkbox"
              name="IsLeaderTaskCheckbox"
              id="IsLeaderTaskCheckbox"
              className="addingTaskPageIsLeaderTaskCheckboxCheckbox"
            />
          </div>
          <div className="addingTaskPageLinkingTasksContainer">
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
                  <option value="">
                    --Tâche(s) disponible(s)--
                  </option>
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
                  <option value="">
                    --Tâche(s) disponible(s)--
                  </option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
          <div className="buttonsContainerStyle">
            <NextButton
              type="submit"
              styleClassName="btnStyle10"
              mainClassName="SubmitBtn_AccountCreation"
              text="Valider"
            />
            <NextButton
              type="submit"
              styleClassName="btnStyle11"
              mainClassName="SubmitBtn_AccountCreation"
              text="Quitter"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
