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
import { useEffect, useState } from "react";

interface Member {
  id : number,
  firstName : string,
  lastName : string,
  taskIdAssigned : number
}

interface propInterface {
  taskToBeAssigned: { id: number; taskName: string } | undefined;
  onClose: () => void;
  onMemberObject: (member : Member) => void;
}

export default function TaskAssignmentPage({
  taskToBeAssigned,
  onClose,
  onMemberObject
}: propInterface) {
  const [existingMembers, setExistingMembers] = useState<any>([]);
  const [existingMemberObject, setExistingMemberObject] = useState<any>();

  useEffect(() => {
    loadExistingMembers();
  }, []);

  async function loadExistingMembers() {
    const res = await fetch(`http://localhost:8080/members`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);

    if (res.status !== 200)
      console.log("un autre code que 200 est apparu : " + res.status);
    if (res.status === 200) {
      const jsonResponse = res.json();
      console.log(JSON.stringify(await jsonResponse));

      const response = await jsonResponse;
      console.log(response);

      setExistingMembers(response);
    }
  }

  async function memberCreatedAndAssignedHandlesubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const formEntries = Object.fromEntries(form.entries());

    const res = await fetch("http://localhost:8080/members", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formEntries),
    });

    if (res.status !== 201) console.log("ajout membre échoué " + res.status);

    if (res.status === 201) {
      const CreatedMemberjsonResponse = await res.json();

      const memberCreatedAndAssigned = Object.assign(CreatedMemberjsonResponse, {taskIdAssigned : taskToBeAssigned?.id})

      console.log(memberCreatedAndAssigned);
      
      onMemberObject(memberCreatedAndAssigned);

      onClose();
    }

    console.log("ok");
    // navigate("/missionPage");
  }

  return (
    <div className="taskAssignmentPageOverlayStyle">
      <div className="taskAssignmentPageStyle">
        <h1 className="titleFormStyle5">
          {`ASSIGNER LA TACHE : ${taskToBeAssigned?.taskName}`}{" "}
        </h1>
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
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedMember = existingMembers.find(
                      (m: any) => m.id === selectedId,
                    );
                    setExistingMemberObject(selectedMember);
                  }}
                >
                  <option value="">--Bénévole(s) existant(s)--</option>
                  {existingMembers.map((el: any) => (
                    <option key={el.id} value={el.id}>
                      {el.firstName} {el.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <NextButton
                type="button"
                styleClassName="btnStyle10"
                mainClassName="SubmitBtn_MemberAssignedToTask"
                text="Choisir"
                onClick={() => {

                  const existingMemberAndAssigned = Object.assign(existingMemberObject, {taskIdAssigned : taskToBeAssigned?.id});

                  console.log(existingMemberAndAssigned);

                  onMemberObject(existingMemberAndAssigned);
                  onClose();
                }}
              />
            </div>
          </div>
          <p className="taskAssignmentPageOrTextStyle"> ou </p>
          <div className="taskAssignmentPageCreateAssignTasksContainer">
            <p className="taskAssignmentPageCreateAssignTasksTitle">
              CREER ET ASSIGNER UN NOUVEAU BENEVOLE
            </p>
            <form
              className="formClassName"
              onSubmit={(e) => memberCreatedAndAssignedHandlesubmit(e)}
            >
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
