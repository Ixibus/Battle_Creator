import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import './taskAndAssignmentContainerStyle.css'

interface propInterface {
    taskName : string
}

export default function TaskAndAssignmentContainer({taskName} : propInterface) {
  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
      />
      <MemberAssignmentTag mainClassName="assigner" memberName="assigner" />
    </div>
  );
}
