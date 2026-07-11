import Icone, { StyleType } from "../../components/Icones/Icone";
import Item from "../../assets/icones/tools.svg?react";
import Checked from "../../assets/icones/checked.svg?react";
import "./missionPage.css";
import MaterialTag from "../../components/MaterialTag/MaterialTag";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import TaskAndAssignmentContainer from "../../components/TaskAndAssignmentContainer/TaskAndAssignmentContainer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddingTaskPage from "../AddingTaskPage/AddingTaskPage";
import OverlayedWarning from "../../components/OverlayedWarning/OverlayedWarning";
import TaskAssignmentPage from "../TaskAssignmentPage/TaskAssignmentPage";

export default function MissionPage() {
  interface Task {
    id: number;
    taskName: string;
  }
  
  interface Member {
  id : number,
  firstName : string,
  lastName : string
  }

  const { id } = useParams();

  const [objResponse, setObjResponse] = useState<any>();

  const [showAddTaskPage, setShowAddTaskPage] = useState<Boolean>(false);

  const [
    showDisplayOverlayedWarningComponentPage,
    setShowDisplayOverlayedWarningComponent,
  ] = useState<Boolean>(false);

  const [showTaskAssignmentPage, setShowTaskAssignmentPage] =
    useState<Boolean>(false);

  const [missionTasks, setMissionTasks] = useState<Task[]>([]);

  const [tasksCount, setTasksCount] = useState<number>(0);

  const [taskToBeDeletedObject, setTaskToBeDeletedObject] = useState<Task>();

  const [taskToBeAssignedObject, setTaskToBeAssignedObject] = useState<Task>();


  const [memberAssigned, setMemberAssigned] = useState<Member>();

  useEffect( () => console.log(memberAssigned), [memberAssigned])


  const [checkedTask, setCheckedTask] = useState(false);

  useEffect(() => {
    loadMission();
    loadMissionTasks();
  }, [id]);

  async function loadMission() {
    const res = await fetch(`http://localhost:8080/missions/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.status);

    if (res.status !== 200)
      console.log("un autre code que 200 est apparu : " + res.status);
    if (res.status === 200) {
      const jsonResponse = res.json();
      console.log(JSON.stringify(await jsonResponse));

      const response = await jsonResponse;
      console.log(response);

      setObjResponse(response);
    }
  }

  async function loadMissionTasks() {
    const res = await fetch(`http://localhost:8080/tasks/mission/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status !== 200)
      console.log("les données n'ont pas été chargées : " + res.status);
    if (res.status === 200) {
      const taskDatas = await res.json();

      console.log(taskDatas);

      setMissionTasks(taskDatas);
    }
  }

  useEffect(() => {
    function tasksCounter() {
      let idTasksLength: number[] = [];

      for (const el of missionTasks) {
        idTasksLength.push(el.id);
      }

      setTasksCount(idTasksLength.length);
    }
    tasksCounter();
  }, [missionTasks]);

  async function deleteTaskHandler(taskId: number | undefined) {
    const res = await fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 204) {
      setMissionTasks((state) =>
        state.filter((missionTasks) => missionTasks.id !== taskId),
      );
      setTaskToBeDeletedObject(() => {});
    }
  }

  console.log(taskToBeDeletedObject);

  return (
    <div
      className={
        showAddTaskPage ||
        showDisplayOverlayedWarningComponentPage ||
        showTaskAssignmentPage
          ? "missionPageContainerStyle missionPageBackgroundDisplay"
          : "missionPageContainerStyle"
      }
    >
      <div className="missionPageContainerLeftContainerStyle">
        <div className="missionPageTitleAndDescriptionContainer">
          <h2 className="missionPageMissionTitleStyle">{objResponse?.name}</h2>
          <p className="missionPageObjectifStyle">{objResponse?.goal}</p>
        </div>
        <div className="missionPageDescriptionContainer">
          <h3 className="missionPageDescriptionTitleStyle">DESCRIPTION</h3>
          <p className="missionPageDescriptionStyle">
            {objResponse?.description}
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
            <span className="missionPageTasksnumber">
              {tasksCount === 0
                ? "Aucune tâche"
                : tasksCount === 1
                  ? `${tasksCount} tâche`
                  : `${tasksCount} tâches`}
            </span>
          </div>
          {missionTasks.map((el: any) => (
            <TaskAndAssignmentContainer
              key={el.id}
              taskName={el.taskName}
              onClickSecondButton={() => {
                setTaskToBeDeletedObject({ id: el.id, taskName: el.taskName });
                setShowDisplayOverlayedWarningComponent(true);
              }}
              onClickAssignTag={() => {
                setShowTaskAssignmentPage(true);
                setTaskToBeAssignedObject({ id: el.id, taskName: el.taskName });
              }}
            />
          ))}
          <PlusButton
            topMarginButton="20px"
            btnStyle="btnStyle14"
            mainClassName="missionPageMaterialAddingButton"
            text="Ajouter une tâche"
            onClick={() => {
              setShowAddTaskPage(true);
            }}
          />
          {showAddTaskPage && (
            <AddingTaskPage
              onClose={() => setShowAddTaskPage(false)}
              missionId={id}
              onTaskCreated={loadMissionTasks}
            />
          )}
          {showDisplayOverlayedWarningComponentPage && (
            <OverlayedWarning
              taskToBeDeleted={taskToBeDeletedObject}
              onDeleteTask={() => {
                deleteTaskHandler(taskToBeDeletedObject?.id);
                setShowDisplayOverlayedWarningComponent(false);
              }}
              onClose={() => {
                setShowDisplayOverlayedWarningComponent(false);
                setTaskToBeDeletedObject(() => {});
              }}
            />
          )}
          {showTaskAssignmentPage && (
            <TaskAssignmentPage
              taskToBeAssigned={taskToBeAssignedObject}
              onMemberObject={(member) => setMemberAssigned(member)}
              onClose={() => {
                setShowTaskAssignmentPage(false);
              }}
              
            />
          )}
        </div>
      </div>
    </div>
  );
}
