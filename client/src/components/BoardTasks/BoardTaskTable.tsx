import { BoardTaskTableColumn } from './BoardTaskTableColumn';
import { TaskStatus } from '../../api/Task';
import { useTasksDragAndDrop } from '../../hooks';
import './BoardTaskTable.scss';

const BoardTaskTable = () => {
  const { handleDragStart, handleDrop } = useTasksDragAndDrop();

  return (
    <div className="board-task-table">
      <BoardTaskTableColumn
        taskStatus={TaskStatus.Backlog}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
      <BoardTaskTableColumn
        taskStatus={TaskStatus.InProgress}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
      <BoardTaskTableColumn
        taskStatus={TaskStatus.Done}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />
    </div>
  )
}

export { BoardTaskTable };