import Icone, { StyleType } from "../../components/Icones/Icone";
import Item from "../../assets/icones/tools.svg?react";
import Task from "../../assets/icones/checked.svg?react";
import "./missionPage.css";
import MaterialTag from "../../components/MaterialTag/MaterialTag";
import PlusButton from "../../components/Button/PlusButton/PlusButton";

export default function MissionPage() {
  return (
    <div className="missionPageContainerStyle">
      <div className="missionPageContainerLeftContainerStyle">
        <h2 className="missionPageMissionTitleStyle">MC</h2>
        <p className="missionPageObjectifStyle">
          Assurer que l'évènement suit bien l'agenda fixé et que l'ambiance se
          maintienne
        </p>
        <p className="missionPageDescriptionStyle">
          Exemple de tâches importantes : - location du micro - briefing
          organisation de l'évènement - briefing profil des jurys - présentation
          du staff
        </p>
        <div className="missionPageMaterialsContainerStyle">
          <div className="missionPageMaterialsTitleContainerStyle">
            <Icone SrcIcone={Item} styleType={StyleType.style3} />
            <h3 className="missionPageMaterialsTitle">MATERIELS</h3>
          </div>
          <div className="missionPageMaterialItemsContainerStyle">
            <MaterialTag btnStyle="btnStyle13" mainClassName="micro" text="micro"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="spareMic" text="micro de rechange"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="pen" text="stylo"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="notePad" text="bloc note"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="waterBottle" text="bouteille d'eau"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="headset" text="oreillette"/>
            <MaterialTag btnStyle="btnStyle13" mainClassName="battlePlanning" text="planning battle"/>
            <PlusButton btnStyle="btnStyle14" mainClassName="missionPageMaterialAddingButton" text="Ajouter du matériel"/>
          </div>
        </div>
      </div>
      <div className="missionPageContainerRightContainerStyle">
            <div className="missionPageTasksTitleContainerStyle">
                <h3 className="missionPageMaterialsTitle">MATERIELS</h3>
                <span className="missionPageTasksnumber">
                    5 tâches
                </span>
          </div>
      </div>
    </div>
  );
}
