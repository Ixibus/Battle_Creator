import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/onboarding/onboardingMissionsDescriptionStyle.css";
import "../../styles/onboarding/onboardingMissionsContainerStyle.css";
import "../../styles/onboarding/onboardingMissionsStyle.css";
import NextButton from "../../components/Button/NextButton/NextButton";
import { useEffect } from "react";
import { useStepStore } from "../../store/useStepStore";

export default function OnboardingMandatoryMissions() {
  const setActiveStep = useStepStore((state) => state.setActiveStep);

  useEffect(() => {
    setActiveStep(3);
  }, [setActiveStep]);

  return (
    <>
      <div className="formStyle">
        <h1 className="titleFormStyle">Missions Obligatoires</h1>
        
        <p className="onboardingMandatoryMissionsDescriptionContainer onboardingMissionsDescriptionStyle">
          Vos missions indispensables pour réaliser le projet d'évènement de danse Hiphop
        </p>

        {/* Transformation des <p> en <ul> / <li> pour une sémantique de liste reconnue par WAVE */}
        <ul className="onboardingMandatoryMissionContainer onboardingMissionsContainerStyle" aria-label="Liste des missions obligatoires">
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">ESPACE</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">GESTION MC</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">TICKETERIE</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">JUGES</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">DJ</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">PLANNING EVENT</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">SYSTEME SON</li>
          <li className="onboardingMandatoryMission onboardingMandatoryMissionsStyle">PHASE DE BATTLE</li>
        </ul>

        {/* Précision du contexte du bouton via ariaLabel */}
        <NextButton
          id='onboardingMandatoryMissionsNextBtnId'
          nav={"/onboardingOptionalMissions"}
          styleClassName="btnStyle10"
          mainClassName="onboardingMandatoryMissionsNextBtn"
          text="Suivant"
          ariaLabel="Passer à l'étape suivante : Missions optionnelles"
        />
      </div>
    </>
  );
}