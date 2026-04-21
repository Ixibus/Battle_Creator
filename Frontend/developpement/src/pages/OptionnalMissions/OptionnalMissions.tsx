import "./optionnalMissionsTextDescriptionContainer.css";
import "./optionalMissionInputContainer.css";
import "../../styles/global/inputContainer.css";

export default function OptionnalMissions() {
  return (
    <>
      <div className="form">
        <h1>Missions Optionnelles</h1>
        <p className="optionnalMissionsTextDescriptionContainer">
          Voici les missions optionnelles qui seront par défaut affichées sur l'espace de votre projet de battle.
          Ils pourront être supprimées une fois votre projet de battle créé.
        </p>
        <div className="inputContainer">
          <p className="optionalMissionInputContainer">ESPACE</p>
          <p className="optionalMissionInputContainer">GESTION MC</p>
          <p className="optionalMissionInputContainer">TICKETTERIE</p>
          <p className="optionalMissionInputContainer">JUGES</p>
          <p className="optionalMissionInputContainer">DJ</p>
          <p className="optionalMissionInputContainer">PLANNING EVENT</p>
          <p className="optionalMissionInputContainer">SYSTEME SON</p>
          <p className="optionalMissionInputContainer">PHASE DE BATTLE</p>
        </div>
      </div>
    </>
  );
}
