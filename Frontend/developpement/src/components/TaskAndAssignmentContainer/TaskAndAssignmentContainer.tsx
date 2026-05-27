import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

interface propInterface {
    taskName : string
}

export default function TaskAndAssignmentContainer({taskName} : propInterface) {
  return (
    <div className="missionPageTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
      />
      <MemberAssignmentTag mainClassName="assigner" memberName="assigner" />
    </div>
  );
}
