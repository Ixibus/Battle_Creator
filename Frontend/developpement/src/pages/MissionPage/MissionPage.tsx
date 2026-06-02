import Icone, { StyleType } from "../../components/Icones/Icone";
import Item from "../../assets/icones/tools.svg?react";
import Checked from "../../assets/icones/checked.svg?react";
import "./missionPage.css";
import MaterialTag from "../../components/MaterialTag/MaterialTag";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import TaskTag from "../../components/TaskTag/TaskTag";
import MemberAssignmentTag from "../../components/MemberAssignmentTag/MemberAssignmentTag";
import TaskAndAssignmentContainer from "../../components/TaskAndAssignmentContainer/TaskAndAssignmentContainer";

export default function MissionPage() {
  return (
    <div className="missionPageContainerStyle">
      <div className="missionPageContainerLeftContainerStyle">
        <div className="missionPageTitleAndDescriptionContainer">
          <h2 className="missionPageMissionTitleStyle">Vestiaires</h2>
          <p className="missionPageObjectifStyle">
            assurer que les participants puissent avoir un endroit pour poser leur affaires en sécurité
          </p>
        </div>
        <div className="missionPageDescriptionContainer">
          <h3 className="missionPageDescriptionTitleStyle">DESCRIPTION</h3>
          <p className="missionPageDescriptionStyle">
            A faire absolument :
            - Désigner un chef d'équipe
            - Chercher un fournisseur pour les portants, les tables, les numéros, les cintres, etc.
            - Voir si des proches peuvent pas nous dépanner
            - Négocier les prix
          </p>
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
