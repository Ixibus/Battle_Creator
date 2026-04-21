import "./mandatoryMissionsTextDescriptionContainer.css";
import "./mandatoryMissionInputContainer.css";
import "../../styles/global/inputContainer.css";

export default function MandatoryMissions() {
  return (
    <>
      <div className="form">
        <h1>Missions Obligatoires</h1>
        <p className="mandatoryMissionsTextDescriptionContainer">
          Battle Creator vous expose ici les missions indispensables pour la
          création d'un battle hiphop. Ces missions seront donc exposées par
          défaut dans votre profil de projet et ne pourront pas être retirées.
        </p>
        <div className="inputContainer">
          <p className="mandatoryMissionInputContainer">ESPACE</p>
          <p className="mandatoryMissionInputContainer">GESTION MC</p>
          <p className="mandatoryMissionInputContainer">TICKETTERIE</p>
          <p className="mandatoryMissionInputContainer">JUGES</p>
          <p className="mandatoryMissionInputContainer">DJ</p>
          <p className="mandatoryMissionInputContainer">PLANNING EVENT</p>
          <p className="mandatoryMissionInputContainer">SYSTEME SON</p>
          <p className="mandatoryMissionInputContainer">PHASE DE BATTLE</p>
        </div>
      </div>
    </>
  );
}
