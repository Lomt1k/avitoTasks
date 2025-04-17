import { BoardTaskTableColumn } from './BoardTaskTableColumn';
import { TaskStatus } from '../../api/Task';
import './BoardTaskTable.scss';

const BoardTaskTable = () => {
  return (
    <div className="board-task-table">
      <BoardTaskTableColumn taskStatus={TaskStatus.Backlog} />
      <BoardTaskTableColumn taskStatus={TaskStatus.InProgress} />
      <BoardTaskTableColumn taskStatus={TaskStatus.Done} />
    </div>
  )
}

export { BoardTaskTable };