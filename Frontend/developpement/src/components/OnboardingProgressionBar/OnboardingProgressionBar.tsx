import "./OnboardingProgressionBarStyle.css";
import { useStepStore } from "../../store/useStepStore";

export default function OnboardingProgressionBar() {
  const activeStep = useStepStore((state) => state.activeStep);

  return (
    <div className="onboardingProgressionBarWrapper">
      <ul className="onboardingProgressionBarStyle">
        {/* Étape 1 */}
        <li className={`stepContainer ${activeStep >= 1 ? "is-active" : ""}`}>
          <p className="stepNumberContainer" data-steptitle="Création de compte">
            1
          </p>
        </li>

        {/* Segment 1–2 */}
        <div className={`segment ${activeStep >= 2 ? "filled" : ""}`} />

        {/* Étape 2 */}
        <li className={`stepContainer ${activeStep >= 2 ? "is-active" : ""}`}>
          <p className="stepNumberContainer" data-steptitle="Création de projet">
            2
          </p>
        </li>

        {/* Segment 2–3 */}
        <div className={`segment ${activeStep >= 3 ? "filled" : ""}`} />

        {/* Étape 3 */}
        <li className={`stepContainer ${activeStep >= 3 ? "is-active" : ""}`}>
          <p className="stepNumberContainer" data-steptitle="Missions obligatoires">
            3
          </p>
        </li>

        {/* Segment 3–4 */}
        <div className={`segment ${activeStep >= 4 ? "filled" : ""}`} />

        {/* Étape 4 */}
        <li className={`stepContainer ${activeStep >= 4 ? "is-active" : ""}`}>
          <p className="stepNumberContainer" data-steptitle="Missions optionnelles">
            4
          </p>
        </li>
      </ul>
    </div>
  );
}