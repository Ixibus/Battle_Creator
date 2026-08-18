import "./addingMissionPage.css";

import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/formError.css";
import "../../styles/global/btnStyle.css";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Cross from "../../assets/icones/crossCancelor.svg?react";

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
import { useProjectStore } from "../../store/useProjectStore";
import { useMissionStore, type MissionType } from "../../store/useMissionStore";
import Icone, { StyleType } from "../../components/Icones/Icone";

interface propsInterface {
  onClose: () => void;
}

type TouchedFields = {
  missionName: boolean;
  goal: boolean;
  description: boolean;
};

export default function AddingMissionPage({ onClose }: propsInterface) {
  const navigate = useNavigate();
  const location = useLocation();

  const [missionName, setMissionName] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");

  const showToast = useToastStore((state) => state.showToast);

  // Récupération du projet sélectionné et de l'action Zustand
  const { selectedProject } = useProjectStore();
  const { addMission, setSelectedMission } = useMissionStore();

  const [touched, setTouched] = useState<TouchedFields>({
    missionName: false,
    goal: false,
    description: false,
  });

  const isMissionNameEmpty = missionName.trim() === "";
  const isGoalEmpty = goal.trim() === "";
  const isDescriptionEmpty = description.trim() === "";

  const hasError = isMissionNameEmpty || isGoalEmpty || isDescriptionEmpty;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setTouched({
      missionName: true,
      goal: true,
      description: true,
    });

    if (hasError) {
      showToast("Merci de remplir tous les champs obligatoires", "error");
      return;
    }

    // Vérification qu'un projet est bien sélectionné avant de créer la mission
    if (!selectedProject?.id) {
      showToast(
        "Aucun projet n'est actuellement sélectionné pour y rattacher la mission",
        "error",
      );
      return;
    }

    const finalDatas = {
      type: "option",
      isDefault: false,
      missionName: missionName.trim(),
      missionGoal: goal.trim(),
      missionDescription: description.trim(),
      projectId: selectedProject.id,
    };

    try {
      const res = await fetch("http://localhost:8080/missions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalDatas),
      });

      const responseData: MissionType = await res.json();

      if (!res.ok) {
        console.log(res.json());
        console.log(responseData.id);
        showToast(
          (responseData as any).message ||
            "Une erreur est survenue lors de la création de la mission",
          "error",
        );
        return;
      }

      if (!responseData.id) {
        showToast(
          "La mission a été créée, mais son identifiant est introuvable",
          "error",
        );
        return;
      }

      // Synchronisation directe avec le store Zustand
      addMission(responseData);
      setSelectedMission(responseData);

      showToast("La mission a été créée avec succès", "success");
      handleClear();
      if (location.pathname.endsWith("/homePage") || location.pathname.endsWith("homePage")) {
        navigate(`/missionPage/${responseData.id}`);
      } else if (location.pathname.endsWith("missionList")) {
        onClose();
      } else {
        onClose();
      }
    } catch (err: any) {
      showToast(
        `Impossible de contacter le serveur${
          err?.message ? ` : ${err.message}` : ""
        }`,
        "error",
      );
    }
  }

  function handleClear() {
    setMissionName("");
    setGoal("");
    setDescription("");

    setTouched({
      missionName: false,
      goal: false,
      description: false,
    });
  }

  return (
    <div className="addingMissionPageStyleContainerForOverlay" onClick={onClose}>
      <form className="formStyle3 addingMissionPageStyle" onSubmit={handleSubmit} onClick={(e)=> e.stopPropagation()}>
      <Icone
        SrcIcone={Cross}
        styleType={StyleType.style9}
        onClick={() => {
          handleClear();
          onClose();
        }}
      />
        <h1 className="titleFormStyle4">AJOUTER UNE MISSION</h1>

        <div className="inputsFormContainerStyle">
          {/* Nom de la mission */}
          <InputContainer
            inputLabelStyle={InputLabelStyle.style3}
            labelName="Nom de la mission"
            inputItemStyle={InputItemStyle.style3}
            htmlFor="missionName"
            type="text"
            value={missionName}
            onChange={(e) => setMissionName(e.target.value)}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                missionName: true,
              }))
            }
            hasError={touched.missionName && isMissionNameEmpty}
          />

          <div className="errorSlot">
            {touched.missionName && isMissionNameEmpty && (
              <p className="formErrorMessageStyle">
                Merci de renseigner le nom de la mission
              </p>
            )}
          </div>

          {/* Objectif de la mission */}
          <AreaTextContainer
            htmlFor="missionGoal"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Objectif de la mission"
            areaTextStyle={AreaTextStyle.style3}
            cols={35}
            rows={2}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                goal: true,
              }))
            }
            hasError={touched.goal && isGoalEmpty}
          />

          <div className="errorSlot">
            {touched.goal && isGoalEmpty && (
              <p className="formErrorMessageStyle">
                Merci de renseigner l'objectif de la mission
              </p>
            )}
          </div>

          {/* Description de la mission */}
          <AreaTextContainer
            htmlFor="missionDescription"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Description de la mission"
            areaTextStyle={AreaTextStyle.style2}
            cols={35}
            rows={10}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() =>
              setTouched((state) => ({
                ...state,
                description: true,
              }))
            }
            hasError={touched.description && isDescriptionEmpty}
          />

          <div className="errorSlot">
            {touched.description && isDescriptionEmpty && (
              <p className="formErrorMessageStyle">
                Merci de décrire la mission
              </p>
            )}
          </div>

          {/* Boutons */}
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
    </div>
  );
}
