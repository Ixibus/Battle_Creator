import "./OnboardingProgressionBarStyle.css";
import { useStepStore } from "../../store/useStepStore";

export default function OnboardingProgressionBar() {
  const activeStep = useStepStore((state) => state.activeStep);

  return (
    <div 
      className="onboardingProgressionBarWrapper"
      role="region"
      aria-label="Progression de l'inscription"
    >
      <ul className="onboardingProgressionBarStyle">
        {/* Étape 1 */}
        <li 
          className={`stepContainer ${activeStep >= 1 ? "is-active" : ""}`}
          aria-current={activeStep === 1 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            data-steptitle="Création de compte"
            aria-label={`Étape 1 sur 4 : Création de compte ${activeStep > 1 ? "(terminée)" : activeStep === 1 ? "(étape actuelle)" : ""}`}
          >
            1
          </p>
        </li>

        {/* Segment 1–2 */}
        <div 
          className={`segment ${activeStep >= 2 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        {/* Étape 2 */}
        <li 
          className={`stepContainer ${activeStep >= 2 ? "is-active" : ""}`}
          aria-current={activeStep === 2 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            data-steptitle="Création de projet"
            aria-label={`Étape 2 sur 4 : Création de projet ${activeStep > 2 ? "(terminée)" : activeStep === 2 ? "(étape actuelle)" : ""}`}
          >
            2
          </p>
        </li>

        {/* Segment 2–3 */}
        <div 
          className={`segment ${activeStep >= 3 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        {/* Étape 3 */}
        <li 
          className={`stepContainer ${activeStep >= 3 ? "is-active" : ""}`}
          aria-current={activeStep === 3 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            data-steptitle="Missions obligatoires"
            aria-label={`Étape 3 sur 4 : Missions obligatoires ${activeStep > 3 ? "(terminée)" : activeStep === 3 ? "(étape actuelle)" : ""}`}
          >
            3
          </p>
        </li>

        {/* Segment 3–4 */}
        <div 
          className={`segment ${activeStep >= 4 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        {/* Étape 4 */}
        <li 
          className={`stepContainer ${activeStep >= 4 ? "is-active" : ""}`}
          aria-current={activeStep === 4 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            data-steptitle="Missions optionnelles"
            aria-label={`Étape 4 sur 4 : Missions optionnelles ${activeStep === 4 ? "(étape actuelle)" : ""}`}
          >
            4
          </p>
        </li>
      </ul>
    </div>
  );
}