import { FC, useEffect, useState } from 'react';
import { TaskWithoutBoard } from '../../api/Task';
import './BoardTaskTable.scss';
import { BoardTaskTableColumn } from './BoardTaskTableColumn';

type BoardTaskTableProps = {
  tasks: TaskWithoutBoard[];
}

const BoardTaskTable: FC<BoardTaskTableProps> = ({ tasks }) => {
  const [tasksBacklog, setTasksBacklog] = useState<TaskWithoutBoard[]>([]);
  const [tasksInProgress, setTasksInProgress] = useState<TaskWithoutBoard[]>([]);
  const [tasksDone, setTasksDone] = useState<TaskWithoutBoard[]>([]);

  useEffect(() => {
    setTasksBacklog(tasks.filter(x => x.status === 'Backlog'));
    setTasksInProgress(tasks.filter(x => x.status === 'InProgress'));
    setTasksDone(tasks.filter(x => x.status === 'Done'));
  }, [tasks]);

  return (
    <div className="board-task-table">
      <BoardTaskTableColumn tasks={tasksBacklog} />
      <BoardTaskTableColumn tasks={tasksInProgress} />
      <BoardTaskTableColumn tasks={tasksDone} />
    </div>
  )
}

export { BoardTaskTable };