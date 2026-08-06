import "./addingMissionPage.css";

import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/formError.css";
import "../../styles/global/btnStyle.css";

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

export default function AddingMissionPage() {
  const navigate = useNavigate();

  const [missionName, setMissionName] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const showToast = useToastStore((state) => state.showToast);

  const [touched, setTouched] = useState<{
    missionName: boolean;
    goal: boolean;
    description: boolean;
  }>({
    missionName: false,
    goal: false,
    description: false,
  });

  const isMissionNameEmpty = missionName.trim() === "";
  const isGoalEmpty = goal.trim() === "";
  const isDescriptionEmpty = description.trim() === "";

  const hasError = isMissionNameEmpty || isGoalEmpty || isDescriptionEmpty;

  function clearErrorIfTyping() {
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    setTouched({
      missionName: true,
      goal: true,
      description: true,
    });

    if (hasError) {
  showToast(
    "Merci de remplir tous les champs obligatoires",
    "error",
  );
  return;
}

    const finalDatas = {
      type: "option",
      isDefault: "false",
      missionName,
      missionGoal: goal,
      missionDescription: description,
    };

    try {
      const res = await fetch("http://localhost:8080/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalDatas),
      });

      if (!res.ok) {
      showToast("Une erreur est survenue lors de la création de la mission", "error");
        return;
      }

      const createdMission = await res.json();

      if (!createdMission.id) {
        showToast(
          "La mission a été créée, mais son identifiant est introuvable", "error"
        );
        return;
      }

      showToast("la mission a été créée avec succès", "success");
      navigate(`/missionPage/${createdMission.id}`);
    } catch (error) {
      showToast("Impossible de contacter le serveur", "error");
    }
  }

  function handleClear() {
    setMissionName("");
    setGoal("");
    setDescription("");
    setErrorMessage("");

    setTouched({
      missionName: false,
      goal: false,
      description: false,
    });
  }

  return (
    <div className="addingMissionPageStyle">
      <form className="formStyle2" onSubmit={handleSubmit}>
        <h1 className="titleFormStyle4">AJOUTER UNE MISSION</h1>

        <div className="inputsFormContainerStyle">
          <InputContainer
            inputLabelStyle={InputLabelStyle.style3}
            labelName="Nom de la mission"
            inputItemStyle={InputItemStyle.style3}
            htmlFor="missionName"
            type="text"
            value={missionName}
            onChange={(e) => {
              setMissionName(e.target.value);
              clearErrorIfTyping();
            }}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                missionName: true,
              }))
            }
            hasError={touched.missionName && isMissionNameEmpty}
          />

          <AreaTextContainer
            htmlFor="missionGoal"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Objectif de la mission"
            areaTextStyle={AreaTextStyle.style3}
            cols={35}
            rows={2}
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              clearErrorIfTyping();
            }}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                goal: true,
              }))
            }
            hasError={touched.goal && isGoalEmpty}
          />

          <AreaTextContainer
            htmlFor="missionDescription"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Description de la mission"
            areaTextStyle={AreaTextStyle.style2}
            cols={35}
            rows={10}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              clearErrorIfTyping();
            }}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                description: true,
              }))
            }
            hasError={touched.description && isDescriptionEmpty}
          />

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
              nav={-1}
              type="button"
              styleClassName="btnStyle11"
              mainClassName="SubmitBtn_AccountCreation"
              text="Quitter"
              onClick={handleClear}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
