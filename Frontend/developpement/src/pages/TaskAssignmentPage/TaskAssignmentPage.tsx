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

interface propInterface {
  taskToBeAssigned : {id: number, taskName: string} | undefined;
  onClose : () => void;
}


export default function TaskAssignmentPage({taskToBeAssigned, onClose}: propInterface) {
  async function handlesubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const formEntries = Object.fromEntries(form.entries());

    console.log(formEntries);

    const res = await fetch("http://localhost:8080/members", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formEntries),
    });

    const text = await res.text();

    if (res.status !== 201)
      console.log("ajout membre échoué " + res.status);

    if (res.status === 201) {
      console.log("Membre rajouté 🥳");
      onClose();
    }

    console.log("ok");
    // navigate("/missionPage");
  }

  return (
    <div className="taskAssignmentPageOverlayStyle">
      <div className="taskAssignmentPageStyle">
        <h1 className="titleFormStyle5">{`ASSIGNER LA TACHE : ${taskToBeAssigned?.taskName}`} </h1>
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
                type="button"
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
            <form className="formClassName" onSubmit={(e) => handlesubmit(e)}>
              <div className="taskAssignmentPageCreateAssignInnerContainer">
                <div className="taskAssignmentPageCreateAssignInputsContainerStyle">
                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName={"Prénom"}
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor={"taskAssignmentFirstNameMemberInput"}
                    type={"text"}
                  />
                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName={"Nom"}
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor={"taskAssignmentLastNameMemberInput"}
                    type={"text"}
                  />
                  <NextButton
                    type="submit"
                    styleClassName="btnStyle10"
                    mainClassName="SubmitBtn_CreatedMemberAssignedToTask"
                    text="Créer et Assigner"
                  />
                </div>
              </div>
            </form>
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
      </div>
    </div>
  );
}
