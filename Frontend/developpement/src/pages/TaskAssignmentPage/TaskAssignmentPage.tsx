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



export default function TaskAssignmentPage( {onClose} : { onClose: () => void }) {
  
  
  return (
    <div className="taskAssignmentPageOverlayStyle">
      <div className="taskAssignmentPageStyle">
        <form className="formStyle2" onSubmit={(e) => handlesubmit(e)}>
          <h1 className="titleFormStyle4">ASSIGNER LA TACHE : </h1>
          <div className="taskAssignmentPageInnerInputsFormStyle">
            <div className="taskAssignmentPageExistingMemberTasksContainer">
              <p className="taskAssignmentPageExistingMemberTasksTitle">
                ASSIGNER UN BENEVOLE EXISTANT
              </p>
              <div className="taskAssignmentPageExistingMemberInnerContainer">
                <div className="taskAssignmentPageExistingMemberInputsContainer">
                  <label
                    htmlFor="taskAssignmentPageExistingMemberInputsLabel"
                    className="taskAssignmentPageExistingMemberInputsLabelStyle"
                  >
                    Mes bénévoles
                  </label>
                  <select
                    name="taskAssignmentPageExistingMemberInputsSelect"
                    className="taskAssignmentPageExistingMemberInputsSelectStyle"
                    id=""
                  >
                    <option value="">--Bénévole(s) existant(s)--</option>
                    <option value=""></option>
                    <option value=""></option>
                  </select>
                </div>
                <NextButton
                  nav={-1}
                  type="submit"
                  styleClassName="btnStyle10"
                  mainClassName="SubmitBtn_MemberAssignedToTask"
                  text="Choisir"
                />
              </div>
            </div>
            <p className="taskAssignmentPageOrTextStyle"> ou </p>
            <div className="taskAssignmentPageCreateAssignTasksContainer">
              <p className="taskAssignmentPageCreateAssignTasksTitle">
                CREER ET ASSIGNER UN NOUVEAU BENEVOLE
              </p>
              <div className="taskAssignmentPageCreateAssignInnerContainer">
                <div className="taskAssignmentPageCreateAssignInputsContainerStyle">
                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName={"Prénom"}
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor={"TaskAssignmentFirstNameMemberInput"}
                    type={"text"}
                  />
                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName={"Nom"}
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor={"TaskAssignmentLastNameMemberInput"}
                    type={"text"}
                  />
                  <NextButton
                    nav={-1}
                    type="submit"
                    styleClassName="btnStyle10"
                    mainClassName="SubmitBtn_CreatedMemberAssignedToTask"
                    text="Créer et Assigner"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="buttonsContainerStyle">
            <NextButton
              type="button"
              styleClassName="btnStyle11"
              mainClassName="SubmitBtn_LeaveTaskAssignmentPage"
              text="Quitter"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
