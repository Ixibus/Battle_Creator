import "./taskAssignmentPage.css";
import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/formError.css";

import { useEffect, useState } from "react";
import { useToastStore } from "../../store/toastStore";

import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";

import NextButton from "../../components/Button/NextButton/NextButton";

interface Task {
  id: number;
  taskName: string;
  memberId?: number | null;
  memberFirstName?: string | null;
  memberLastName?: string | null;
}

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  taskIdAssigned: number;
}

interface propInterface {
  taskToBeAssigned: Task | undefined;
  onClose: () => void;
  onMemberObject: (member: Member) => void;
}

export default function TaskAssignmentPage({
  taskToBeAssigned,
  onClose,
  onMemberObject,
}: propInterface) {
  const [existingMembers, setExistingMembers] = useState<any[]>([]);
  const [existingMemberObject, setExistingMemberObject] = useState<
    any | undefined
  >();

  const [mode, setMode] = useState<"existing" | "new" | null>(null);

  useEffect(() => {
    loadExistingMembers();
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [touched, setTouched] = useState<{
    firstName: boolean;
    lastName: boolean;
    existingMember: boolean;
  }>({
    firstName: false,
    lastName: false,
    existingMember: false,
  });

  const showToast = useToastStore((state) => state.showToast);

  const isFirstNameEmpty = firstName.trim() === "";
  const isLastNameEmpty = lastName.trim() === "";
  const isExistingMemberEmpty =
    !existingMemberObject || existingMemberObject.id == null;

  const hasErrorNewMember = isFirstNameEmpty || isLastNameEmpty;
  const hasErrorExistingMember = isExistingMemberEmpty;

  const [serverError, setServerError] = useState(false);

  async function loadExistingMembers() {
    const res = await fetch(`http://localhost:8080/members`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const response = await res.json();
      setExistingMembers(response);
    }
  }

  async function memberCreatedAndAssignedHandleSubmit(
    e: React.SubmitEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setTouched((state) => ({
      ...state,
      firstName: true,
      lastName: true,
    }));

    if (hasErrorNewMember) {
      showToast("Merci de renseigner le prénom et le nom du bénévole", "error");
      return;
    }

    if (!taskToBeAssigned) {
      showToast("Aucune tâche n'a été sélectionnée", "error");
      return;
    }

    const memberData = {
      firstName,
      lastName,
    };

    setServerError(false);

    try {
      const res = await fetch("http://localhost:8080/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (!res.ok) {
        setServerError(true);
        let message = "Une erreur est survenue lors de la création du bénévole";

        try {
          const errorBody = await res.json();
          if (errorBody?.message) message = errorBody.message;
        } catch {
          const errorText = await res.text();
          if (errorText) message = errorText;
        }

        showToast(message, "error");
        return;
      }

      const createdMember = await res.json();

      const memberCreatedAndAssigned = {
        ...createdMember,
        taskIdAssigned: taskToBeAssigned.id,
      };

      showToast(`Bénévole "${createdMember.firstName + " " + createdMember.lastName}" a été créé et assigné à la tâche "${taskToBeAssigned.taskName}" `, "success");
      onMemberObject(memberCreatedAndAssigned);
      onClose();
    } catch {
      showToast("Impossible de contacter le serveur", "error");
    }
  }
  
  function handleChooseExistingMember() {
    setTouched((state) => ({
      ...state,
      existingMember: true,
    }));
    
    if (hasErrorExistingMember) {
      showToast("Merci de choisir un bénévole parmi ceux existants", "error");
      return;
    }
    
    if (!taskToBeAssigned) {
      showToast("Aucune tâche n'a été sélectionnée", "error");
      return;
    }
    
    const existingMemberAndAssigned = {
      ...existingMemberObject,
      taskIdAssigned: taskToBeAssigned.id,
    };
    
    onMemberObject(existingMemberAndAssigned);
    showToast(`Bénévole "${existingMemberObject.firstName + " " + existingMemberObject.lastName}" a été créé et assigné à la tâche "${taskToBeAssigned.taskName}" `, "success");
    onClose();
  }

  function handleClose() {
    setFirstName("");
    setLastName("");
    setExistingMemberObject(undefined);
    setMode(null);

    setTouched({
      firstName: false,
      lastName: false,
      existingMember: false,
    });

    onClose();
  }

  return (
    <div className="taskAssignmentPageOverlayStyle">
      <div className="taskAssignmentPageStyle">
        {taskToBeAssigned?.memberId === null ? (
          <h1 className="titleFormStyle5">
            {`ASSIGNER LA TACHE : ${taskToBeAssigned?.taskName}`}
          </h1>
        ) : (
          <div className="taskAssignmentTitleContainerStyle">
            <h1 className="titleFormStyle4">
              {`ASSIGNER LA TACHE : ${taskToBeAssigned?.taskName}`}
            </h1>
            <div className="taskAssignmentMemberContainerStyle">
              <div className="btnStyle19 taskAssignmentMemberInnerContainerStyle">
                {`${taskToBeAssigned?.memberFirstName} ${taskToBeAssigned?.memberLastName}`}
              </div>
            </div>
          </div>
        )}

        <div className="taskAssignmentPageInnerInputsFormStyle">
          <div
            className="taskAssignmentPageExistingMemberTasksContainer"
            onClick={() => setMode("existing")}
            style={{
              opacity: mode === "new" ? 0.25 : 1,
            }}
          >
            {taskToBeAssigned?.memberId === null ? (
              <p className="taskAssignmentPageExistingMemberTasksTitle">
                ASSIGNER UN BENEVOLE EXISTANT
              </p>
            ) : (
              <p className="taskAssignmentPageExistingMemberTasksTitle">
                ASSIGNER UN AUTRE BENEVOLE
              </p>
            )}

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
                  id="taskAssignmentPageExistingMemberInputsSelect"
                  className={`taskAssignmentPageExistingMemberInputsSelectStyle ${
                    touched.existingMember && hasErrorExistingMember
                      ? "inputError"
                      : ""
                  }`}
                  onChange={(e) => {
                    const selectedId = Number(e.target.value);
                    const selectedMember = existingMembers.find(
                      (m: any) => m.id === selectedId,
                    );
                    setExistingMemberObject(selectedMember);
                  }}
                  onBlur={() =>
                    setTouched((state) => ({
                      ...state,
                      existingMember: true,
                    }))
                  }
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
                onClick={handleChooseExistingMember}
              />
            </div>
          </div>

          <p className="taskAssignmentPageOrTextStyle"> ou </p>

          <div
            className="taskAssignmentPageCreateAssignTasksContainer"
            onClick={() => setMode("new")}
            style={{
              opacity: mode === "existing" ? 0.25 : 1,
            }}
          >
            {taskToBeAssigned?.memberId === null ? (
              <p className="taskAssignmentPageCreateAssignTasksTitle">
                CREER ET ASSIGNER UN NOUVEAU BENEVOLE
              </p>
            ) : (
              <p className="taskAssignmentPageCreateAssignTasksTitle">
                CREER UN BENEVOLE ET L'ASSIGNER
              </p>
            )}

            <form
              className="formClassName"
              onSubmit={memberCreatedAndAssignedHandleSubmit}
            >
              <div className="taskAssignmentPageCreateAssignInnerContainer">
                <div className="taskAssignmentPageCreateAssignInputsContainerStyle">
                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName="Prénom"
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setServerError(false);
                    }}
                    onBlur={() =>
                      setTouched((state) => ({
                        ...state,
                        firstName: true,
                      }))
                    }
                    hasError={
                      serverError || (touched.firstName && isFirstNameEmpty)
                    }
                  />

                  <InputContainer
                    inputLabelStyle={InputLabelStyle.style1}
                    labelName="Nom"
                    inputItemStyle={InputItemStyle.style3}
                    htmlFor="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setServerError(false);
                    }}
                    onBlur={() =>
                      setTouched((state) => ({
                        ...state,
                        lastName: true,
                      }))
                    }
                    hasError={
                      serverError || (touched.lastName && isLastNameEmpty)
                    }
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
            onClick={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
