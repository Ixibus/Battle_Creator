import "./taskAssignmentPage.css";

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

export default function TaskAssignmentPage() {
  return (
    <div className="addingTaskPageStyle">
      <form className="formStyle2" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle4">ASSIGNER LA TACHE : </h1>
        <div className="taskAssignmentPageInnerInputsFormStyle">
          <div className="taskAssignmentPageTasksContainer">
            <p className="taskAssignmentPageTasksTitle">
              ASSIGNER UN BENEVOLE EXISTANT
            </p>
            <div className="taskAssignmentPageInnerContainer">
              <div className="addingTaskPageLinkingPreviousTaskContainer">
                <label htmlFor="addingTaskPageLinkingPreviousTaskLabel" className="addingTaskPageLinkingPreviousTaskLabelStyle">
                  Mes bénévoles
                </label>
                <select
                  name="addingTaskPageLinkingPreviousTaskLabel"
                  className="addingTaskPageLinkingPreviousTaskSelect"
                  id=""
                >
                  <option value="">--Bénévole(s) existant(s)--</option>
                  <option value=""></option>
                  <option value=""></option>
                </select>
              </div>
              <NextButton
                type="submit"
                styleClassName="btnStyle10"
                mainClassName="SubmitBtn_MemberAssignedToTask"
                text="Choisir"
              />
            </div>
          </div>
          <p className="taskAssignmentPageOrTextStyle"> ou </p>
          <div className="taskAssignmentPageTasksContainer">
            <p className="taskAssignmentPageTasksTitle">
              CREER ET ASSIGNER UN NOUVEAU BENEVOLE
            </p>
            <div className="taskAssignmentPageInnerContainer">
              <div className="addingTaskPageLinkingPreviousTaskContainer">
                <InputContainer
                  inputLabelStyle={InputLabelStyle.style1}
                  labelName={"Prénom"}
                  inputItemStyle={InputItemStyle.style1}
                  htmlFor={"TaskAssignmentFirstNameMemberInput"}
                  type={"text"}
                />
                <InputContainer
                  inputLabelStyle={InputLabelStyle.style1}
                  labelName={"Nom"}
                  inputItemStyle={InputItemStyle.style1}
                  htmlFor={"TaskAssignmentLastNameMemberInput"}
                  type={"text"}
                />
                <NextButton
                  type="submit"
                  styleClassName="btnStyle10"
                  mainClassName="SubmitBtn_MemberAssignedToTask"
                  text="Créer et Assigner"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="buttonsContainerStyle">
          <NextButton
            type="submit"
            styleClassName="btnStyle11"
            mainClassName="SubmitBtn_AccountCreation"
            text="Quitter"
          />
        </div>
      </form>
    </div>
  );
}
