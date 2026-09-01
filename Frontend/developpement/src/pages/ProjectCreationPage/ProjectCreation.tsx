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

import { useEffect } from "react";
import { useStepStore } from "../../store/useStepStore";

const API_URL = import.meta.env.VITE_API_URL;

type TouchedFields = {
  projectName: boolean;
  projectLocation:boolean;
  projectDate: boolean;
  projectDescription: boolean;
};

export default function ProjectCreation() {
  const navigate = useNavigate();


  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectDate, setProjectDate] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  // const [errorMessage, setErrorMessage] = useState("");

  const [touched, setTouched] = useState<TouchedFields>({
    projectName: false,
    projectLocation: false,
    projectDate: false,
    projectDescription: false,
  });

  const [serverProjectNameError, setServerProjectNameError] = useState("");
  const [serverProjectDateError, setServerProjectDateError] = useState("");

  const showToast = useToastStore((state) => state.showToast);

  const setActiveStep = useStepStore((state) => state.setActiveStep);

  const newAccountId = sessionStorage.getItem("newAccountId");

  // console.log("newAccountId :", newAccountId);

  const isProjectNameEmpty = projectName.trim() === "";
  const isProjectLocationEmpty = projectLocation.trim() === "";
  const isProjectDateEmpty = projectDate.trim() === "";
  const isProjectDescriptionEmpty = projectDescription.trim() === "";

  const isProjectDateInThePast =
    !isProjectDateEmpty && projectDate < getTodayDate();

  const hasError =
    isProjectNameEmpty ||
    isProjectLocationEmpty ||
    isProjectDateEmpty ||
    isProjectDateInThePast ||
    isProjectDescriptionEmpty;

  useEffect(() => {
    setActiveStep(2);
  }, [setActiveStep]);

  function getTodayDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function clearProjectNameErrorIfTyping() {
    setServerProjectNameError("");
  }

  // function clearProjectDescriptionErrorIfTyping() {
  //   if (errorMessage) {
  //     setErrorMessage("");
  //   }
  // }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // setErrorMessage("");
    setServerProjectNameError("");
    setServerProjectDateError("");

    setTouched({
      projectName: true,
      projectLocation: true,
      projectDate: true,
      projectDescription: true,
    });

    if (hasError) {
      showToast("Merci de remplir tous les champs", "error");
      return;
    }

    try {
      if (!newAccountId) {
        showToast("Veuillez d'abord créer un compte", "error");

        navigate("/accountCreation");
        return;
      }

      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName.trim(),
          projectLocation: projectLocation.trim(),
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

        console.log(responseData)

        return;
      }

      if (response.status === 201) {
        showToast(
          `La création du projet \"${responseData.projectName}\" a réussi !`,
          "success",
        );

        sessionStorage.removeItem("newAccountId");

        handleClear();
        navigate("/onboardingMandatoryMissions");
      }
    } catch (err: any) {
      showToast(`Impossible de contacter le serveur${err.message}`, "error");
    }
  }

  function handleClear() {
    setProjectName("");
    setProjectLocation("");
    setProjectDate("");
    setProjectDescription("");

    // setErrorMessage("");
    setServerProjectNameError("");
    setServerProjectDateError("");

    setTouched({
      projectName: false,
      projectLocation: false,
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
            clearProjectNameErrorIfTyping();
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

        <InputContainer
          inputLabelStyle={InputLabelStyle.style1}
          inputItemStyle={InputItemStyle.style1}
          labelName="lieu du déroulement"
          htmlFor="projectLocation"
          type="text"
          value={projectLocation}
          onChange={(e) => {
            setProjectLocation(e.target.value);
          }}
          onBlur={() =>
            setTouched((state) => ({
              ...state,
              projectLocation: true,
            }))
          }
          hasError={(touched.projectLocation && isProjectLocationEmpty)}
        />

        <div className="errorSlot">
          {touched.projectLocation && isProjectLocationEmpty && (
            <p className="formErrorMessageStyle">
              Merci de renseigner le lieu du déroulement du projet
            </p>
          )}

        </div>

        <DateInputContainer
          labelName="Date du déroulement du projet"
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
            // clearProjectDescriptionErrorIfTyping();
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

        {/* <div className="errorSlot">
          {errorMessage && (
            <p className="formErrorMessageStyle">{errorMessage}</p>
          )}
        </div> */}

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
