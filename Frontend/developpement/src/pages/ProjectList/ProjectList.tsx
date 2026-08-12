import NextButton from "../../components/Button/NextButton/NextButton";
import Icone, { StyleType } from "../../components/Icones/Icone";
import Project from "../../assets/icones/project.svg?react";
import FilledPoint from "../../assets/icones/filledPoint.svg?react";

import {useProjectStore, type ProjectType} from "../../store/useProjectStore";

import {formatDateFr} from "../../utils/toFrenchDateFormat";

import "./ProjectList.css";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function ProjectList() {

  const navigate = useNavigate();


  const { user, projects, isLoading, error, fetchUserProjects, setSelectedProject } =
  useProjectStore();

  const handleSelectProject = (project : ProjectType) => {
    console.log("hit")
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

  return (
    <div className="projectListContainer">
      <div className="projectListGreetingContainer">
        <div className="projectListNicoPpStyle" />
        <p className="projectListGreetingtext">{user?.login || "Utilisateur"}</p>
      </div>
      <h2 className="projectListTitle">Vos projets</h2>

      {isLoading && <p>Chargement de vos projets...</p>}
      {error && <p className="formErrorMessageStyle">{error}</p>}

      {!isLoading && !error && projects.length === 0 && (
        <p>Aucun projet trouvé.</p>
      )}

      <div className="projectListProjectsContainer">
        {projects.map((project, index) => (

        <div key={project.id || index}
            className={`projectListAuthedProjectContainer projectListAuthedProject${
              (index % 4) + 1
            }Style`}>
          <div className="projectListIconeAndSelectButtonContainer">
            <Icone SrcIcone={Project} styleType={StyleType.style4} />
            <button className="projectListProjectSelectButton" onClick={() => handleSelectProject(project)}>
              Sélectionner
            </button>
          </div>
          <h3 className="projectListTitleProject">{project.name}</h3>
          <div className="projectListProjectInfoContainer" >
            <p>Lieu à définir</p>
            <Icone SrcIcone={FilledPoint} />
            <p>{formatDateFr(project.projectDate)}</p>
          </div>
        </div>
        ))}
      </div>
      <NextButton
        nav={-1}
        type="button"
        styleClassName="btnStyle11"
        mainClassName="projectListExitButton"
        text="Quitter"
      />
    </div>
  );
}
