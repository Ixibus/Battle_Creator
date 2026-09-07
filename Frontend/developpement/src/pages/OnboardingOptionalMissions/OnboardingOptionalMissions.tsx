import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/onboarding/onboardingMissionsDescriptionStyle.css";
import "../../styles/onboarding/onboardingMissionsContainerStyle.css";
import "../../styles/onboarding/onboardingMissionsStyle.css";
import NextButton from "../../components/Button/NextButton/NextButton";
import { useEffect } from "react";
import { useStepStore } from "../../store/useStepStore";

export default function OnboardingOptionalMissions() {

  const setActiveStep = useStepStore((state) => state.setActiveStep);

  useEffect(() => {
    setActiveStep(4);
  }, [setActiveStep]);

  return (
    <>
      <div className="formStyle">
        <h1 className="titleFormStyle">Missions Optionnelles</h1>
        
        <p className="onboardingOptionalMissionsDescriptionContainer onboardingMissionsDescriptionStyle">
          Missions essentielles pour votre projet que vous pourrez supprimer une
          fois sur votre espace d'organisation.
        </p>

        {/* Structure de liste sémantique pour WAVE */}
        <ul className="onboardingOptionalMissionContainer onboardingMissionsContainerStyle" aria-label="Liste des missions optionnelles">
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            COMMUNICATION EVENEMENT
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            VESTIAIRES
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            MATERIELS D'AMBIANCE
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            SIGNALETIQUES
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            MATERIELS PARTICIPANTS
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            PERSONNEL D'ENCADREMENT
          </li>
          <li className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            COLLATION JUGE
          </li>
        </ul>

        {/* Bouton avec ariaLabel contextuel */}
        <NextButton
          nav={"/connexionPage"}
          styleClassName="btnStyle10"
          mainClassName="onboardingMandatoryMissionsNextBtn"
          text="Se connecter"
          ariaLabel="Finaliser la configuration et aller à la page de connexion"
        />
      </div>
    </>
  );
}