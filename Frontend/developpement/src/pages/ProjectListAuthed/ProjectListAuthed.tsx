import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import ProjectIcon from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import { useProjectStore, type ProjectType } from "../../store/useProjectStore";
import { formatDateFr } from "../../utils/toFrenchDateFormat";

import "./projectListAuthed.css";

export default function ProjectListAuthed() {
  const navigate = useNavigate();
  const {
    user,
    projects,
    isLoading,
    error,
    fetchUserProjects,
    logout,
    setSelectedProject,
  } = useProjectStore();

  const handleExit = () => {
    logout();
    navigate("/connexionPage");
  };

  const handleSelectProject = (project: ProjectType) => {
    setSelectedProject(project);
    navigate("/homePage");
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserProjects();
    } else {
      console.warn("user.id est nul/undefined au montage !");
    }
  }, [user?.id, fetchUserProjects]);

  return (
    <main className="projectListAuthedContainer">
      <div className="projectListAuthedGreetingContainer">
        <div className="projectListAuthedNicoPpStyle" aria-hidden="true" />
        <h2 className="projectListAuthedGreetingtext">
          Bienvenue {user?.login || "Utilisateur"}
        </h2>
      </div>

      <h1 className="projectListAuthedTitle">Choisissez un projet</h1>

      <div aria-live="polite">
        {isLoading && <p>Chargement de vos projets...</p>}
        {error && <p className="formErrorMessageStyle" role="alert">{error}</p>}

        {!isLoading && !error && projects.length === 0 && (
          <p>Aucun projet trouvé. Veuillez en créer un !</p>
        )}
      </div>

      <ul className="projectListAuthedProjectsContainer" aria-label="Liste de vos projets">
        {projects.map((project, index) => (
          <li
            key={project.id || index}
            className={`projectListAuthedProjectContainer projectListAuthedProject${
              (index % 4) + 1
            }Style`}
          >
            <div className="projectListAuthedIconeAndSelectButtonContainer">
              <Icone SrcIcone={ProjectIcon} styleType={StyleType.style4} aria-hidden="true" />
              <button
                type="button"
                className="projectListAuthedProjectSelectButton"
                onClick={() => handleSelectProject(project)}
                aria-label={`Sélectionner le projet ${project.name}`}
              >
                Sélectionner
              </button>
            </div>
            <h2 className="projectListAuthedTitleProject">
              {project.name}
            </h2>
            <div className="projectListAuthedProjectInfoContainer">
              <p>{project.location}</p>
              <Icone SrcIcone={FilledPoint} aria-hidden="true" />
              <p>{formatDateFr(project.projectDate)}</p>
            </div>
          </li>
        ))}
      </ul>

      <NextButton
        type="button"
        styleClassName="btnStyle11"
        mainClassName="projectListAuthedExitButton"
        text="Déconnexion"
        onClick={handleExit}
        ariaLabel="Se déconnecter de l'application"
      />
    </main>
  );
}