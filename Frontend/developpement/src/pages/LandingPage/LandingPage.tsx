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
          <button className="btnStyle1 getStartedBtn_LandingPageContainer">
            Commencer
          </button>
          <button
            type="submit"
            className="btnStyle2 signUpBtn_LandingPageContainer"
          >
            Connexion
          </button>
        </div>
      </main>
    </>
  );
}
