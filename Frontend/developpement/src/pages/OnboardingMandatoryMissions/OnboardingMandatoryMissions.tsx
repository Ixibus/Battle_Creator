import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/onboarding/onboardingMissionsDescriptionStyle.css";
import "../../styles/onboarding/onboardingMissionsContainerStyle.css";
import "../../styles/onboarding/onboardingMissionsStyle.css";
import NextButton from "../../components/Button/NextButton/NextButton";



export default function OnboardingMandatoryMissions() {
  return (
    <>
      <div className="formStyle">
        <h1 className="titleFormStyle">Missions Obligatoires</h1>
        <p className="onboardingMandatoryMissionsDescriptionContainer onboardingMissionsDescriptionStyle">
          Vos missions indispensables pour réaliser le projet d'évènement de danse
          Hiphop
        </p>
        <div className="onboardingMandatoryMissionContainer onboardingMissionsContainerStyle">
          <p className="onboardingMandatoryMission onboardingMissionsStyle">ESPACE</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">GESTION MC</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">TICKETTERIE</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">JUGES</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">DJ</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">PLANNING EVENT</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">SYSTEME SON</p>
          <p className="onboardingMandatoryMission onboardingMissionsStyle">PHASE DE BATTLE</p>
        </div>
        <NextButton styleClassName="btnStyle10" mainClassName="onboardingMandatoryMissionsNextBtn" text="Suivant"/>
      </div>
    </>
  );
}
