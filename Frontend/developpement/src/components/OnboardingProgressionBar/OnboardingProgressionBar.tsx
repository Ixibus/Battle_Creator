import "./OnboardingProgressionBarStyle.css";

export default function OnboardingProgressionBar() {
  return (
    <ul className="onboardingProgressionBarStyle">
      <li className="stepContainer step1ContainerStyle">
        <p className="stepNumberContainer step1NumberContainerStyle" data-stepTitle="Création de compte">1</p>
      </li>
      <div className="segment step2segmentContainer" />
      <li className="stepContainer step2ContainerStyle">
        <p className="stepNumberContainer step2NumberContainerStyle" data-stepTitle="Création de projet">2</p>
      </li>
      <div className="segment step3segmentContainer" />
      <li className="stepContainer step3ContainerStyle">
        <p className="stepNumberContainer step3NumberContainerStyle" data-stepTitle="Missions obligatoires">3</p>
      </li>
      <div className="segment step4segmentContainer" />
      <li className="stepContainer step4ContainerStyle">
        <p className="stepNumberContainer step4NumberContainerStyle" data-stepTitle="Missions optionnelles">4</p>
      </li>
    </ul>
  );
}
