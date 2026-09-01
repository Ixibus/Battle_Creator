import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Mission from "../../assets/icones/optionnalMission.svg?react";
import Arrow from "../../assets/icones/forwardArrow.svg?react";

import { useMissionStore, type MissionType } from "../../store/useMissionStore";
import { useProjectStore } from "../../store/useProjectStore";

import "./missionList.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import AddingMissionPage from "../AddingMissionPage/AddingMissionPage";

export default function MissionList() {
  const navigate = useNavigate();

  const [showAddingMissionPage, setShowAddingMissionPage] =
    useState<boolean>(false);

  const {
    missions,
    isLoading,
    error,
    fetchMissionsByProject,
    selectedMission,
    setSelectedMission,
  } = useMissionStore();

  const { selectedProject } = useProjectStore();

  // 1. Sélection d'une NOUVELLE mission : on met à jour le store + navigation
  const handleSelectMission = (mission: MissionType) => {
    setSelectedMission(mission);
    navigate(`/missionPage/${mission.id}`);
  };

  // 2. Bouton "Quitter" : Retourne sur la MissionPage courante SI elle existe toujours, sinon sur HomePage
  const handleQuit = () => {
    const isMissionStillValid = missions.some(
      (m) => m.id === selectedMission?.id,
    );

    if (selectedMission?.id && isMissionStillValid) {
      navigate(`/missionPage/${selectedMission.id}`);
    } else {
      // Si aucune mission n'était sélectionnée ou si la mission a été supprimée en BDD
      navigate("/homePage");
    }
  };

  useEffect(() => {
    if (showAddingMissionPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAddingMissionPage]);

  useEffect(() => {
    if (selectedProject?.id) {
      fetchMissionsByProject(selectedProject.id);
    }
  }, [selectedProject?.id, fetchMissionsByProject]);

  useEffect(() => {
    // On ne nettoie QUE si le chargement est terminé ET qu'il y a des missions chargées
    if (!isLoading && missions.length > 0 && selectedMission) {
      const exists = missions.some((m) => m.id === selectedMission.id);
      if (!exists) {
        setSelectedMission(null);
      }
    }
  }, [missions, isLoading, selectedMission, setSelectedMission]);

  return (
    <div className={showAddingMissionPage ? "missionListContainer missionListContainerForOverlay" : "missionListContainer"}>
      <main className="missionListMainContent">
        <div className="missionListTitleContainer">
          <h1 className="missionListTitle">Missions personnalisées</h1>
          {selectedProject?.name && (
            <div className="missionListGoalContainerStyle">
              <div className="btnStyle19 missionListGoalInnerContainerStyle">
                {selectedProject.name}
              </div>
            </div>
          )}
        </div>

        <div aria-live="polite">
          {!selectedProject && (
            <p className="formErrorMessageStyle" role="alert">
              Veuillez d'abord sélectionner un projet pour afficher ses missions.
            </p>
          )}

          {isLoading && <p>Chargement de vos missions...</p>}

          {error && <p className="formErrorMessageStyle" role="alert">{error}</p>}

          {!isLoading && !error && selectedProject && missions.length === 0 && (
            <p>Aucune mission trouvée pour ce projet.</p>
          )}
        </div>

        <ul className="missionListMissionsContainer" aria-label="Liste des missions personnalisées">
          {missions.map((mission, index) => (
            <li key={mission.id || index}>
              <button
                type="button"
                className="missionListMissionContainer"
                onClick={() => handleSelectMission(mission)}
                aria-label={`Accéder à la mission ${mission.name}`}
              >
                <div className="missionListIconeTitleAndGoalContainer">
                  <div className="missionIconeMissionListContainer">
                    <Icone SrcIcone={Mission} styleType={StyleType.style1} aria-hidden="true" />
                  </div>
                  <div className="titleAndGoalMissionContainer">
                    <h2 className="missionListTitleMission">{mission.name}</h2>
                    <p className="missionListGoalMission">{mission.goal}</p>
                  </div>
                </div>
                <span className="misionSelectButtonListMissionContainer" aria-hidden="true">
                  <Icone SrcIcone={Arrow} styleType={StyleType.style1} />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <PlusButton
          topMarginButton="20px"
          btnStyle="btnStyle14"
          mainClassName="missionListAddingButton"
          text="Ajouter une mission personnalisée"
          ariaLabel="Ajouter une nouvelle mission personnalisée"
          onClick={() => {
            setShowAddingMissionPage(true);
          }}
        />

        <NextButton
          onClick={handleQuit}
          type="button"
          styleClassName="btnStyle11"
          mainClassName="missionListExitButton"
          text="Quitter"
          ariaLabel="Quitter la liste des missions"
        />
      </main>

      {showAddingMissionPage && (
        <AddingMissionPage
          onClose={() => {
            setShowAddingMissionPage(false);
          }}
        />
      )}
    </div>
  );
}