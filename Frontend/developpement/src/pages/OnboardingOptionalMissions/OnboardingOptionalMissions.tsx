import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/onboarding/onboardingMissionsDescriptionStyle.css";
import "../../styles/onboarding/onboardingMissionsContainerStyle.css";
import "../../styles/onboarding/onboardingMissionsStyle.css";
import NextButton from "../../components/Button/NextButton/NextButton";

export default function OptionalMissions() {
  return (
    <>
      <div className="formStyle">
        <h1 className="titleFormStyle">Missions Optionnelles</h1>
        <p className="onboardingOptionalMissionsDescriptionContainer onboardingMissionsDescriptionStyle">
          Missions essentielles pour votre projet que vous pourrez supprimer une
          fois sur votre espace d'organisation.
        </p>
        <div className="onboardingOptionalMissionContainer onboardingMissionsContainerStyle">
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            COMMUNICATION EVENEMENT
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            VESTIAIRES
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            MATERIELS D'AMBIANCE
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            SIGNALETIQUES
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            MATERIELS PARTICIPANTS
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            PERSONNEL D'ENCADREMENT
          </p>
          <p className="onboardingOptionalMission onboardingMissionsStyle">
            COLLATION JUGE
          </p>
        </div>
        <NextButton
          styleClassName="btnStyle3"
          mainClassName="onboardingMandatoryMissionsNextBtn"
          text="Suivant"
        />
      </div>
    </>
  );
}
