import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import './taskAndAssignmentContainerStyle.css';

interface propInterface {
    taskName : string,
    onClickSecondButton: () => void,
    onClickAssignTag: () => void
}

export default function TaskAndAssignmentContainer({taskName, onClickSecondButton, onClickAssignTag} : propInterface) {
  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClickSecondButton={onClickSecondButton}
      />
      <MemberAssignmentTag memberName="assigner" mainClassName="assigner" onClick={onClickAssignTag}/>
    </div>
  );
}
