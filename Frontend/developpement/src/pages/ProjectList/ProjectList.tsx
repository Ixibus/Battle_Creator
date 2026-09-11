import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Project from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import { useProjectStore, type ProjectType } from "../../store/useProjectStore";

import { formatDateFr } from "../../utils/toFrenchDateFormat";

import "./projectList.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import AddingNewProject from "../AddingNewProject/AddingNewProject";

export default function ProjectList() {
  const navigate = useNavigate();

  const [showAddingNewProject, setShowAddingNewProject] =
    useState<boolean>(false);

  const {
    user,
    projects,
    isLoading,
    error,
    fetchUserProjects,
    setSelectedProject,
  } = useProjectStore();

  const handleSelectProject = (project: ProjectType) => {
    console.log("hit");
    setSelectedProject(project);
    navigate("/homePage");
  };

  useEffect(() => {
    if (showAddingNewProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showAddingNewProject]);

  useEffect(() => {
    if (user?.id) {
      fetchUserProjects();
    } else {
      console.warn("user.id est nul/undefined au montage !");
    }
  }, [user?.id, fetchUserProjects, showAddingNewProject]);

  return (
    <div
      className={
        showAddingNewProject
          ? "projectListContainer projectListBackgroundForOverlay"
          : "projectListContainer"
      }
    >
      <main className="projectListMainContent">
        <div className="projectListGreetingContainer">
          <div className="projectListNicoPpStyle" aria-hidden="true" />
          <span className="projectListGreetingtext">
            {user?.login || "Utilisateur"}
          </span>
        </div>

        <h1 className="projectListTitle">Vos projets</h1>

        <div aria-live="polite">
          {isLoading && <p>Chargement de vos projets...</p>}
          {error && <p className="formErrorMessageStyle" role="alert">{error}</p>}
          {!isLoading && !error && projects.length === 0 && (
            <p>Aucun projet trouvé.</p>
          )}
        </div>

        <ul className="projectListProjectsContainer" aria-label="Liste de vos projets">
          {projects.map((project, index) => (
            <li
              key={project.id || index}
              className={`projectListAuthedProjectContainer projectListAuthedProject${
                (index % 4) + 1
              }Style`}
            >
              <div className="projectListIconeAndSelectButtonContainer">
                <Icone SrcIcone={Project} styleType={StyleType.style4} aria-hidden="true" />
                <button
                  type="button"
                  className="projectListProjectSelectButton"
                  onClick={() => handleSelectProject(project)}
                  aria-label={`Sélectionner le projet ${project.name}`}
                >
                  Sélectionner
                </button>
              </div>
              <h2 className="projectListTitleProject">{project.name}</h2>
              <div className="projectListProjectInfoContainer">
                <p>{project.location}</p>
                <Icone SrcIcone={FilledPoint} aria-hidden="true" />
                <p>{formatDateFr(project.projectDate)}</p>
              </div>
            </li>
          ))}
        </ul>

        <PlusButton
          topMarginButton="20px"
          btnStyle="btnStyle14"
          mainClassName="missionListAddingButton"
          text="Créer un nouveau projet"
          ariaLabel="Créer un nouveau projet"
          onClick={() => {
            setShowAddingNewProject(true);
          }}
        />
        <NextButton
          nav={-1}
          type="button"
          styleClassName="btnStyle11"
          mainClassName="projectListExitButton"
          text="Quitter"
          ariaLabel="Quitter la liste des projets"
        />
      </main>

      {showAddingNewProject && (
        <AddingNewProject
          onClose={() => {
            setShowAddingNewProject(false);
          }}
        />
      )}
    </div>
  );
}