import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import './taskAndAssignmentContainerStyle.css'

interface propInterface {
    taskName : string,
    onClick: () => void,
}

export default function TaskAndAssignmentContainer({taskName, onClick} : propInterface) {
  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClick={onClick}
      />
      <MemberAssignmentTag mainClassName="assigner" memberName="assigner" />
    </div>
  );
}
