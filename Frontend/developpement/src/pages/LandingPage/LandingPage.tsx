import NextButton from '../../components/Button/NextButton/NextButton';

import "./LandingPageStyle.css";

export default function LandingPage() {
  return (
    <>
      <main className="landingPageContainer">
        <h1 className="title_LandingPageContainer">Battle Creator</h1>
        <h2 className="subtitle_LandingPageContainer">
          Créez et suivez votre projet d'évènement de danse Hiphop
        </h2>
        <div className="btnsContainer_LandingPageContainer">
          <NextButton styleClassName="btnStyle7" mainClassName="getStartedBtn_LandingPageContainer" text="Commencer"/>
          <NextButton styleClassName="btnStyle8" mainClassName="signUpBtn_LandingPageContainer" text="Connexion"/>
        </div>
      </main>
    </>
  );
}
