import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Mission from "../../assets/icones/optionnalMission.svg?react";

import { useMissionStore, type MissionType } from "../../store/useMissionStore";
import { useProjectStore } from "../../store/useProjectStore";

import "./missionList.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MissionList() {
  const navigate = useNavigate();

  const {
    user,
    missions,
    isLoading,
    error,
    fetchMissionsByProject,
    setSelectedMission,
    selectedMission,
  } = useMissionStore();

  const { selectedProject } = useProjectStore();

  // 1. Sélectionner une mission et aller directement sur MissionPage
  const handleSelectMission = (mission: MissionType) => {
    setSelectedMission(mission);
    navigate(`/missionPage/${mission.id}`);
  };

  // 2. Gestion du bouton "Quitter" pour retourner sur la page de mission
  const handleQuit = () => {
    if (selectedMission?.id) {
      navigate(`/missionPage/${selectedMission.id}`);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (selectedProject?.id) {
      fetchMissionsByProject(selectedProject.id);
    }
  }, [selectedProject?.id, fetchMissionsByProject]);

  return (
    <div className="missionListContainer">
      <div className="missionListGreetingContainer">
        <div className="missionListNicoPpStyle" />
        <p className="missionListGreetingtext">{user?.login || "Utilisateur"}</p>
      </div>

      <h2 className="missionListTitle">
        Missions du projet : {selectedProject?.name || "Projet en cours"}
      </h2>

      {!selectedProject && (
        <p className="formErrorMessageStyle">
          Veuillez d'abord sélectionner un projet pour afficher ses missions.
        </p>
      )}

      {isLoading && <p>Chargement de vos missions...</p>}

      {error && <p className="formErrorMessageStyle">{error}</p>}

      {!isLoading && !error && selectedProject && missions.length === 0 && (
        <p>Aucune mission trouvée pour ce projet.</p>
      )}

      <div className="missionListMissionsContainer">
        {missions.map((mission, index) => (
          <div
            key={mission.id || index}
            className={`missionListAuthedMissionContainer missionListAuthedMission${
              (index % 4) + 1
            }Style`}
          >
            <div className="missionListIconeAndSelectButtonContainer">
              <Icone SrcIcone={Mission} styleType={StyleType.style4} />
              <button
                className="missionListMissionSelectButton"
                onClick={() => handleSelectMission(mission)}
              >
                Sélectionner
              </button>
            </div>
            <h3 className="missionListTitleMission">{mission.name}</h3>
          </div>
        ))}
      </div>

      <NextButton
        onClick={handleQuit}
        type="button"
        styleClassName="btnStyle11"
        mainClassName="missionListExitButton"
        text="Quitter"
      />
    </div>
  );
}