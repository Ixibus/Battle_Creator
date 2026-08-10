import { useState } from "react";

import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/formError.css";
import "../../styles/global/btnStyle.css";

import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";

import AreaTextContainer, {
  AreaLabelStyle,
  AreaTextStyle,
} from "../../components/InputContainer/AreaTextContainer";

import DateInputContainer from "../../components/InputContainer/DateInputContainer";
import NextButton from "../../components/Button/NextButton/NextButton";
import { useToastStore } from "../../store/toastStore";

import { useNavigate } from "react-router-dom";

type TouchedFields = {
  projectName: boolean;
  projectDate: boolean;
  projectDescription: boolean;
};

export default function ProjectCreation() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [touched, setTouched] = useState<TouchedFields>({
    projectName: false,
    projectDate: false,
    projectDescription: false,
  });

  const [serverProjectNameError, setServerProjectNameError] = useState("");
  const [serverProjectDateError, setServerProjectDateError] = useState("");

  const showToast = useToastStore((state) => state.showToast);



  const newAccountId = sessionStorage.getItem("newAccountId");

  // console.log("newAccountId :", newAccountId);

  const isProjectNameEmpty = projectName.trim() === "";
  const isProjectDateEmpty = projectDate.trim() === "";
  const isProjectDescriptionEmpty = projectDescription.trim() === "";

  const isProjectDateInThePast =
    !isProjectDateEmpty && projectDate < getTodayDate();

  const hasError =
    isProjectNameEmpty ||
    isProjectDateEmpty ||
    isProjectDateInThePast ||
    isProjectDescriptionEmpty;

  function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function clearProjectNameError() {
    setServerProjectNameError("");
  }

  function clearErrorIfTyping() {
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");
    setServerProjectNameError("");
    setServerProjectDateError("");

    setTouched({
      projectName: true,
      projectDate: true,
      projectDescription: true,
    });

    if (hasError) {
      return;
    }

    try {
      if (!newAccountId) {
        showToast("Veuillez d'abord créer un compte", "error");

        navigate("/accountCreation");
        return;
      }

      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName.trim(),
          projectDate,
          projectDescription: projectDescription.trim(),
          ownerId: Number(newAccountId),
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.error === "PROJECT_NAME_ALREADY_USED") {
          setServerProjectNameError(responseData.message);

          setTouched((previousTouched) => ({
            ...previousTouched,
            projectName: true,
          }));

          return;
        }

        if (responseData.error === "PROJECT_DATE_IN_PAST") {
          setServerProjectDateError(responseData.message);

          setTouched((previousTouched) => ({
            ...previousTouched,
            projectDate: true,
          }));

          return;
        }

        showToast(
          responseData.message ||
            "Une erreur est survenue lors de la création du projet.",
          "error",
        );

        return;
      }

      if (response.status === 201) {
        showToast(
          `La création du projet \"${responseData.name}\" a réussi !`,
          "success",
        );

        sessionStorage.removeItem("newAccountId");

        handleClear();
        navigate("/onboardingMandatoryMissions");
      }
    } catch {
      showToast("Impossible de contacter le serveur.", "error");
    }
  }

  function handleClear() {
    setProjectName("");
    setProjectDate("");
    setProjectDescription("");

    setErrorMessage("");
    setServerProjectNameError("");
    setServerProjectDateError("");

    setTouched({
      projectName: false,
      projectDate: false,
      projectDescription: false,
    });
  }

  return (
    <>
    <form className="formStyle3" onSubmit={handleSubmit}>
      <h1 className="titleFormStyle">CREATION DE PROJET</h1>

      <div className="inputsFormContainerStyle">
        <InputContainer
          inputLabelStyle={InputLabelStyle.style1}
          inputItemStyle={InputItemStyle.style1}
          labelName="Veuillez entrer le nom du projet"
          htmlFor="projectName"
          type="text"
          value={projectName}
          onChange={(e) => {
            setProjectName(e.target.value);
            clearProjectNameError();
          }}
          onBlur={() =>
            setTouched((state) => ({
              ...state,
              projectName: true,
            }))
          }
          hasError={
            (touched.projectName && isProjectNameEmpty) ||
            serverProjectNameError !== ""
          }
        />

        <div className="errorSlot">
          {touched.projectName && isProjectNameEmpty && (
            <p className="formErrorMessageStyle">
              Merci de renseigner le nom du projet
            </p>
          )}

          {serverProjectNameError && (
            <p className="formErrorMessageStyle">{serverProjectNameError}</p>
          )}
        </div>

        <DateInputContainer
          labelName="Déroulement du projet"
          htmlFor="projectDate"
          value={projectDate}
          onChange={(e) => {
            setProjectDate(e.target.value);
            setServerProjectDateError("");
          }}
          onBlur={() =>
            setTouched((state) => ({
              ...state,
              projectDate: true,
            }))
          }
          hasError={
            (touched.projectDate &&
              (isProjectDateEmpty || isProjectDateInThePast)) ||
            serverProjectDateError !== ""
          }
        />

        <div className="errorSlot">
          {touched.projectDate && isProjectDateEmpty && (
            <p className="formErrorMessageStyle">
              Merci de renseigner la date du projet
            </p>
          )}

          {touched.projectDate && isProjectDateInThePast && (
            <p className="formErrorMessageStyle">
              La date du projet ne peut pas être antérieure à aujourd'hui
            </p>
          )}

          {serverProjectDateError && (
            <p className="formErrorMessageStyle">{serverProjectDateError}</p>
          )}
        </div>

        <AreaTextContainer
          areaLabelStyle={AreaLabelStyle.style1}
          areaTextStyle={AreaTextStyle.style1}
          htmlFor="projectDescription"
          labelName="Décrivez votre projet"
          cols={35}
          rows={10}
          value={projectDescription}
          onChange={(e) => {
            setProjectDescription(e.target.value);
            clearErrorIfTyping();
          }}
          onBlur={() =>
            setTouched((state) => ({
              ...state,
              projectDescription: true,
            }))
          }
          hasError={touched.projectDescription && isProjectDescriptionEmpty}
        />

        <div className="errorSlot">
          {touched.projectDescription && isProjectDescriptionEmpty && (
            <p className="formErrorMessageStyle">
              Merci de décrire votre projet
            </p>
          )}
        </div>

        <div className="errorSlot">
          {errorMessage && (
            <p className="formErrorMessageStyle">{errorMessage}</p>
          )}
        </div>

        <div className="buttonsContainerStyle">
          <NextButton
            type="submit"
            styleClassName="btnStyle10"
            mainClassName="SubmitBtn_AccountCreation"
            text="Valider"
          />

          <NextButton
            type="button"
            styleClassName="btnStyle11"
            mainClassName="SubmitBtn_AccountCreation"
            text="Effacer"
            onClick={handleClear}
          />
        </div>
      </div>
    </form>
    </>
  );
}
