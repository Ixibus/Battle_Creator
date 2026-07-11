import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import "./taskAndAssignmentContainerStyle.css";

interface Member {
  id: number;
  firstName: string;
  lastName: string;
  taskIdAssigned: number;
}

interface propInterface {
  id: number;
  taskName: string;
  onClickSecondButton: () => void;
  onClickAssignTag: () => void;
  assignedMemberObject: Member | undefined;
}

export default function TaskAndAssignmentContainer({
  id,
  taskName,
  onClickSecondButton,
  onClickAssignTag,
  assignedMemberObject,
}: propInterface) {
  console.log(assignedMemberObject);

  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClickSecondButton={onClickSecondButton}
      />
      {assignedMemberObject!== undefined && assignedMemberObject?.taskIdAssigned === id ? (
        <MemberAssignmentTag
          memberName={`${assignedMemberObject!.firstName} ${assignedMemberObject!.lastName}`}
          mainClassName="assigner"
          onClick={onClickAssignTag}
        />
      ) : (
        <MemberAssignmentTag
          memberName="assigner"
          mainClassName="assigner"
          onClick={onClickAssignTag}
        />
      )}
    </div>
  );
}
