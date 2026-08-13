import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Mission from "../../assets/icones/optionnalMission.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import {useMissionStore, type MissionType} from "../../store/useMissionStore";

import {formatDateFr} from "../../utils/toFrenchDateFormat";

import "./missionList.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function MissionList() {

  const navigate = useNavigate();


  const { user, missions, isLoading, error, fetchUserMissions, setSelectedMission } =
  useMissionStore();

  const handleSelectMission = (mission : MissionType) => {
    console.log("hit")
    setSelectedMission(mission);
    navigate("/homePage"); // <--- Remplacez par votre route vers HomePage
  };

  useEffect(() => {

    if (user?.id) {
      fetchUserMissions();
    } else {
      console.warn("user.id est nul/undefined au montage !");
    }
  }, [user?.id, fetchUserMissions]);

  return (
    <div className="missionListContainer">
      <div className="missionListGreetingContainer">
        <div className="missionListNicoPpStyle" />
        <p className="missionListGreetingtext">{user?.login || "Utilisateur"}</p>
      </div>
      <h2 className="missionListTitle">Vos projets</h2>

      {isLoading && <p>Chargement de vos projets...</p>}
      {error && <p className="formErrorMessageStyle">{error}</p>}

      {!isLoading && !error && missions.length === 0 && (
        <p>Aucun projet trouvé.</p>
      )}

      <div className="missionListMissionsContainer">
        {missions.map((mission, index) => (

        <div key={mission.id || index}
            className={`missionListAuthedMissionContainer missionListAuthedMission${
              (index % 4) + 1
            }Style`}>
          <div className="missionListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Mission} styleType={StyleType.style4} />
            <button className="missionListMissionSelectButton" onClick={() => handleSelectMission(mission)}>
              Sélectionner
            </button>
          </div>
          <h3 className="missionListTitleMission">{mission.name}</h3>
          <div className="missionListMissionInfoContainer" >
            <p>{mission.location}</p>
            <Icone SrcIcone={FilledPoint} />
            <p>{formatDateFr(mission.missionDate)}</p>
          </div>
        </div>
        ))}
      </div>
      <NextButton
        nav={-1}
        type="button"
        styleClassName="btnStyle11"
        mainClassName="missionListExitButton"
        text="Quitter"
      />
    </div>
  );
}
