import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/onboarding/onboardingMissionsDescriptionStyle.css";
import "../../styles/onboarding/onboardingMissionsContainerStyle.css";
import "../../styles/onboarding/onboardingMissionsStyle.css";
import NextButton from "../../components/Button/NextButton/NextButton";

export default function OnboardingOptionalMissions() {
  return (
    <>
      <div className="formStyle">
        <h1 className="titleFormStyle">Missions Optionnelles</h1>
        <p className="onboardingOptionalMissionsDescriptionContainer onboardingMissionsDescriptionStyle">
          Missions essentielles pour votre projet que vous pourrez supprimer une
          fois sur votre espace d'organisation.
        </p>
        <div className="onboardingOptionalMissionContainer onboardingMissionsContainerStyle">
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            COMMUNICATION EVENEMENT
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            VESTIAIRES
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            MATERIELS D'AMBIANCE
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            SIGNALETIQUES
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            MATERIELS PARTICIPANTS
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            PERSONNEL D'ENCADREMENT
          </p>
          <p className="onboardingOptionalMission onboardingOptionalMissionsStyle">
            COLLATION JUGE
          </p>
        </div>
        <NextButton
          nav="/connexionPage"
          styleClassName="btnStyle10"
          mainClassName="onboardingMandatoryMissionsNextBtn"
          text="Se connecter"
        />
      </div>
    </>
  );
}
