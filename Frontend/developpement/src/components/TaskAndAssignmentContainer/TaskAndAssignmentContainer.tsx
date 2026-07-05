import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import './taskAndAssignmentContainerStyle.css'

interface propInterface {
    taskName : string,
    onClickSecondButton: () => void,
}

export default function TaskAndAssignmentContainer({taskName, onClickSecondButton} : propInterface) {
  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClickSecondButton={onClickSecondButton}
      />
      <MemberAssignmentTag mainClassName="assigner" memberName="assigner" />
    </div>
  );
}
