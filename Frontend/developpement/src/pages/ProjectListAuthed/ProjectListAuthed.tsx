import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import ProjectIcon from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import {useProjectStore, type ProjectType} from "../../store/useProjectStore";

import {formatDateFr} from "../../utils/toFrenchDateFormat";

import "./ProjectListAuthed.css";


export default function ProjectListAuthed() {
  
  const navigate = useNavigate();
  const { user, projects, isLoading, error, fetchUserProjects, logout, setSelectedProject } =
  useProjectStore();
  
  const handleExit = () => {
    logout(); // Efface Zustand + localStorage
    navigate("/connexionPage");
  };

  const handleSelectProject = (project : ProjectType) => {
    setSelectedProject(project);
    navigate("/homePage"); // <--- Remplacez par votre route vers HomePage
  };

  useEffect(() => {

    if (user?.id) {
      fetchUserProjects();
    } else {
      console.warn("user.id est nul/undefined au montage !");
    }
  }, [user?.id, fetchUserProjects]);

  console.log(isLoading);
  console.log(error);
  console.log(projects.length);

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
              <button className="projectListAuthedProjectSelectButton" onClick={() => handleSelectProject(project)}>
                Sélectionner
              </button>
            </div>
            <h3 className="projectListAuthedTitleProject">
              {project.name}
            </h3>
            <div className="projectListAuthedProjectInfoContainer">
              <p>lieu à définir</p>
              <Icone SrcIcone={FilledPoint} />
              <p>{formatDateFr(project.projectDate)}</p>
            </div>
          </div>
        ))}
      </div>

      <NextButton
        type="button"
        styleClassName="btnStyle11"
        mainClassName="projectListAuthedExitButton"
        text="Déconnexion"
        onClick={handleExit}
      />
    </div>
  );
}