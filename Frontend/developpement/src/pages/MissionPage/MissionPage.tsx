import Icone, { StyleType } from "../../components/Icones/Icone";
import Item from "../../assets/icones/tools.svg?react";
import Checked from "../../assets/icones/checked.svg?react";
import "./missionPage.css";
import MaterialTag from "../../components/MaterialTag/MaterialTag";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import TaskTag from "../../components/TaskTag/TaskTag";
import MemberAssignmentTag from "../../components/MemberAssignmentTag/MemberAssignmentTag";
import TaskAndAssignmentContainer from "../../components/TaskAndAssignmentContainer/TaskAndAssignmentContainer";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MissionPage() {
  const { id } = useParams();

  useEffect(() => { async function loadMission () {
    const res = fetch(`http://localhost:8080/missions/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log((await res).status);

    if ((await res).status !== 200) console.log("un autre code que 200 est apparu : " + (await res).status);
    if ((await res).status === 200) {
      const response = (await res).json();
      console.log(JSON.stringify(await response));
    }
  }; loadMission()}, [id]);


  return (
    <div className="missionPageContainerStyle">
      <div className="missionPageContainerLeftContainerStyle">
        <div className="missionPageTitleAndDescriptionContainer">
          <h2 className="missionPageMissionTitleStyle">MissionName</h2>
          <p className="missionPageObjectifStyle">MissionGoal</p>
        </div>
        <div className="missionPageDescriptionContainer">
          <h3 className="missionPageDescriptionTitleStyle">DESCRIPTION</h3>
          <p className="missionPageDescriptionStyle">MissionDescription</p>
        </div>
        <div className="missionPageMaterialsContainerStyle">
          <h3 className="missionPageMaterialsTitle">MATERIELS</h3>
          <div className="missionPageMaterialItemsContainerStyle">
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="chair"
              text="chaise"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="light"
              text="lumière"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="pen"
              text="stylo"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="notePad"
              text="bloc note"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="waterBottle"
              text="bouteille d'eau"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="headset"
              text="oreillette"
            />
            <MaterialTag
              btnStyle="btnStyle13"
              mainClassName="battlePlanning"
              text="planning battle"
            />
            <PlusButton
              topMarginButton="20px"
              btnStyle="btnStyle12"
              mainClassName="missionPageMaterialAddingButton"
              text="Ajouter du matériel"
            />
          </div>
        </div>
      </div>
      <div className="missionPageContainerRightBackgroundStyle">
        <div className="missionPageContainerRightContainerStyle">
          <div className="missionPageTasksTitleContainerStyle">
            <h3 className="missionPageTasksTitle">TACHES</h3>
            <span className="missionPageTasksnumber">2 tâche(s)</span>
          </div>
          <TaskAndAssignmentContainer taskName="envoyer un mail au fournisseur" />
          <PlusButton
            nav="/addingTaskPage"
            topMarginButton="20px"
            btnStyle="btnStyle14"
            mainClassName="missionPageMaterialAddingButton"
            text="Ajouter une tâche"
          />
        </div>
      </div>
    </div>
  );
}
