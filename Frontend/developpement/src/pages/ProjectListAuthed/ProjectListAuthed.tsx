import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import ProjectIcon from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import { useProjectStore } from "../../store/useProjectStore";
import "./ProjectListAuthed.css";



export default function ProjectListAuthed() {
  
  const navigate = useNavigate();
  const { user, projects, isLoading, error, fetchUserProjects, logout } =
  useProjectStore();
  
  const handleExit = () => {
    logout(); // Efface Zustand + localStorage
    navigate("/connexionPage");
  };

  useEffect(() => {
    // Si l'utilisateur est bien chargé, on récupère ses projets
    console.log("🔍 Composant monté. User actuel :", user);
    if (user?.id) {
      console.log("🚀 Lancement de fetchUserProjects...");
      fetchUserProjects();
    } else {
      console.warn("⚠️ user.id est nul/undefined au montage !");
    }
  }, [user?.id, fetchUserProjects]);

  console.log(isLoading);
  console.log(error);
  console.log(projects.length);
  // ... reste du composant

  return (
    <div className="projectListAuthedContainer">
      <div className="projectListAuthedGreetingContainer">
        <div className="projectListAuthedNicoPpStyle" />
        <p className="projectListAuthedGreetingtext">
          {user?.login || "Utilisateur"}
        </p>
      </div>

      <h2 className="projectListAuthedTitle">Choisissez un projet</h2>

      {isLoading && <p>Chargement de vos projets...</p>}
      {error && <p className="formErrorMessageStyle">{error}</p>}

      {!isLoading && !error && projects.length === 0 && (
        <p>Aucun projet trouvé. Veuillez en créer un !</p>
      )}

      <div className="projectListAuthedProjectsContainer">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className={`projectListAuthedProjectContainer projectListAuthedProject${
              (index % 4) + 1
            }Style`}
          >
            <div className="projectListAuthedIconeAndSelectButtonContainer">
              <Icone SrcIcone={ProjectIcon} styleType={StyleType.style4} />
              <button className="projectListAuthedProjectSelectButton">
                Sélectionner
              </button>
            </div>
            <h3 className="projectListAuthedTitleProject">
              {project.name}
            </h3>
            <div className="projectListAuthedProjectInfoContainer">
              <Icone SrcIcone={FilledPoint} />
              <p>{project.projectDate}</p>
            </div>
          </div>
        ))}
      </div>

      <NextButton
        type="button"
        styleClassName="btnStyle11"
        mainClassName="projectListAuthedExitButton"
        text="Se Déconnecter"
        onClick={handleExit}
      />
    </div>
  );
}