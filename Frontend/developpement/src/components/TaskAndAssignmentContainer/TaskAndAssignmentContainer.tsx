import MemberAssignmentTag from "../MemberAssignmentTag/MemberAssignmentTag";
import TaskTag from "../TaskTag/TaskTag";

import "./taskAndAssignmentContainerStyle.css";

interface AssignedMemberObject {
  id?: number;
  firstName: string;
  lastName: string;
}

interface propInterface {
  id: number;
  taskName: string;
  assignedMember?: AssignedMemberObject;
  onClickSecondButton: () => void;
  onClickAssignTag: () => void;
}

export default function TaskAndAssignmentContainer({
  taskName,
  onClickSecondButton,
  onClickAssignTag,
  assignedMember,
}: propInterface) {
  console.log(assignedMember);

  return (
    <div className="taskAndAssignmentTasksContainer">
      <TaskTag
        mainClassName={taskName}
        text={taskName}
        onClickSecondButton={onClickSecondButton}
      />
      {assignedMember?.id ? (
        <MemberAssignmentTag
          memberName={`${assignedMember.firstName} ${assignedMember.lastName}`}
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
