import "./homePageDisplayer.css";

export default function HomePage() {
  return (
    <>
      <div className="homePageDisplayer">
        <div className="topLeftContainer">
          <div>Membres + Taches</div>
        </div>
        <div className="topRightContainer">
          <div>Progression + Materiels</div>
        </div>
        <div className="mandatoryMissionsContainer">
          <div>Missions obligatoires</div>
        </div>
        <div className="optionnalMissionsContainer">
          <div>Missions optionnelles</div>
        </div>
      </div>
    </>
  );
}
