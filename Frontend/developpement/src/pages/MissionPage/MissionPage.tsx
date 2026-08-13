import Icone, { StyleType } from "../../components/Icones/Icone";
import Item from "../../assets/icones/tools.svg?react";
import Checked from "../../assets/icones/checked.svg?react";
import "./missionPage.css";
import MaterialTag from "../../components/MaterialTag/MaterialTag";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import TaskAndAssignmentContainer from "../../components/TaskAndAssignmentContainer/TaskAndAssignmentContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddingTaskPage from "../AddingTaskPage/AddingTaskPage";
import OverlayedWarning from "../../components/OverlayedWarning/OverlayedWarning";
import TaskAssignmentPage from "../TaskAssignmentPage/TaskAssignmentPage";

import { useToastStore } from "../../store/toastStore";
import { useMissionStore } from "../../store/useMissionStore"; // 👈 Import du store Mission

export default function MissionPage() {
  interface Task {
    id: number;
    taskName: string;
    memberId?: number | null;
    memberFirstName?: string | null;
    memberLastName?: string | null;
  }

  interface Member {
    id: number;
    firstName: string;
    lastName: string;
    taskIdAssigned: number;
  }

  const { id } = useParams();
  const { selectedMission } = useMissionStore();

  // Récupération dynamique de l'ID (depuis l'URL ou le store Zustand)
  const activeMissionId = id || (selectedMission?.id ? String(selectedMission.id) : null);

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

  const showToast = useToastStore((state) => state.showToast);

  // Rechargement dès que l'ID actif change
  useEffect(() => {
    if (activeMissionId) {
      loadMission(activeMissionId);
      loadMissionTasks(activeMissionId);
    }
  }, [activeMissionId]);

  async function getErrorMessage(
    res: Response,
    defaultMessage: string,
  ): Promise<string> {
    try {
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const errorBody = await res.json();
        return errorBody?.message || defaultMessage;
      }

      const errorText = await res.text();
      return errorText || defaultMessage;
    } catch {
      return defaultMessage;
    }
  }

  async function loadMission(missionId: string) {
    try {
      const res = await fetch(`http://localhost:8080/missions/${missionId}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        showToast(
          await getErrorMessage(
            res,
            "Impossible de charger les informations de la mission.",
          ),
          "error",
        );
        return;
      }

      const response = await res.json();
      setObjResponse(response);
    } catch {
      showToast(
        "Impossible de contacter le serveur pour charger la mission.",
        "error",
      );
    }
  }

  async function loadMissionTasks(missionId: string) {
    try {
      const res = await fetch(`http://localhost:8080/tasks/mission/${missionId}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        showToast(
          await getErrorMessage(
            res,
            "Impossible de charger les tâches de la mission.",
          ),
          "error",
        );
        return;
      }

      const taskDatas = await res.json();
      setMissionTasks(taskDatas);
    } catch {
      showToast(
        "Impossible de contacter le serveur pour charger les tâches.",
        "error",
      );
    }
  }

  useEffect(() => {
    setTasksCount(missionTasks.length);
  }, [missionTasks]);

  async function deleteTaskHandler(taskId: number | undefined) {
    if (!taskId) {
      showToast("La tâche à supprimer est introuvable.", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        showToast(
          await getErrorMessage(
            res,
            "La suppression de la tâche a échoué.",
          ),
          "error",
        );
        return;
      }

      setMissionTasks((state) =>
        state.filter((task) => task.id !== taskId),
      );

      showToast(`La tâche "${taskToBeDeletedObject?.taskName}" a bien été supprimée`, "success");
      
      setTaskToBeDeletedObject(undefined);
    } catch {
      showToast(
        "Impossible de contacter le serveur pour supprimer la tâche.",
        "error",
      );
    }
  }

  useEffect(() => {
    async function taskMemberIdAssignment() {
      if (!memberAssigned || !taskToBeAssignedObject?.id || !activeMissionId) {
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/tasks/${taskToBeAssignedObject.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberId: memberAssigned.id,
            }),
          },
        );

        if (!res.ok) {
          showToast(
            await getErrorMessage(
              res,
              "L'assignation du bénévole à la tâche a échoué.",
            ),
            "error",
          );
          return;
        }

        await loadMissionTasks(activeMissionId);
      } catch {
        showToast(
          "Impossible de contacter le serveur pour assigner le bénévole.",
          "error",
        );
      }
    }

    taskMemberIdAssignment();
  }, [memberAssigned, taskToBeAssignedObject?.id, activeMissionId]);

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
          {missionTasks.map((el: Task) => (
            <TaskAndAssignmentContainer
              key={el.id}
              id={el.id}
              taskName={el.taskName}
              assignedMember={{
                id: el.memberId ?? undefined,
                firstName: el.memberFirstName ?? "",
                lastName: el.memberLastName ?? "",
              }}
              onClickSecondButton={() => {
                setTaskToBeDeletedObject({ id: el.id, taskName: el.taskName });
                setShowDisplayOverlayedWarningComponent(true);
              }}
              onClickAssignTag={() => {
                setShowTaskAssignmentPage(true);
                setTaskToBeAssignedObject({
                  id: el.id,
                  taskName: el.taskName,
                  memberId: el.memberId,
                  memberFirstName: el.memberFirstName,
                  memberLastName: el.memberLastName,
                });
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
          {showAddTaskPage && activeMissionId && (
            <AddingTaskPage
              onClose={() => setShowAddTaskPage(false)}
              missionId={activeMissionId}
              onTaskCreated={() => loadMissionTasks(activeMissionId)}
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
                setTaskToBeDeletedObject(undefined);
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