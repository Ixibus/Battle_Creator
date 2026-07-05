import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import './taskAndAssignmentContainerStyle.css'

interface propInterface {
    taskName : string,
    onClickFirstButton: () => void,
    onClickSecondButton: () => void,
}

export default function TaskAndAssignmentContainer({taskName, onClickFirstButton, onClickSecondButton} : propInterface) {
  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClickFirstButton={onClickFirstButton}
        onClickSecondButton={onClickSecondButton}
      />
      <MemberAssignmentTag mainClassName="assigner" memberName="assigner" />
    </div>
  );
}
