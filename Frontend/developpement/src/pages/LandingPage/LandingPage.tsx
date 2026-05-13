import NextButton from '../../components/Button/NextButton/NextButton';

import "./LandingPage.css";

export default function LandingPage() {
  return (
    <>
      <main className="landingPageContainer">
        <h1 className="title_LandingPageContainer">Battle Creator</h1>
        <h2 className="subtitle_LandingPageContainer">
          Créez et suivez votre projet d'évènement de dance Hiphop
        </h2>
        <div className="btnsContainer_LandingPageContainer">
          <NextButton styleClassName="btnStyle1" mainClassName="getStartedBtn_LandingPageContainer" text="Commencer"/>
          <NextButton styleClassName="btnStyle2" mainClassName="signUpBtn_LandingPageContainer" text="Connexion"/>
        </div>
      </main>
    </>
  );
}
