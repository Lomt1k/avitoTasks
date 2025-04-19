import { FC } from 'react';
import { TaskStatus } from '../../api/Task';
import RootStore from '../../store/RootStore';
import { getStatusLocalization } from '../../utils/TaskHelper';
import { TaskCard } from '../Tasks';
import { observer } from 'mobx-react-lite';
import './BoardTaskTableColumn.scss';

type BoardTaskTableColumnProps = {
  taskStatus: TaskStatus;
  onDragStart: (taskId: number) => void;
  onDrop: (status: TaskStatus) => void;
}

const BoardTaskTableColumn: FC<BoardTaskTableColumnProps> = observer(({ taskStatus, onDragStart, onDrop }) => {
  const tasks = RootStore.tasks.tasks.filter(x => x.status === taskStatus);

  return (
    <div
      className='board-task-table-column'
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(taskStatus)}
    >
      <h2 className="board-task-table-column__heading">
        {getStatusLocalization(taskStatus)}
      </h2>
      <ul className="board-task-table-column__list">
        {tasks.map(task => (
          <li key={task.id}>
            <TaskCard task={task} onDragStart={onDragStart} />
          </li>
        ))}
      </ul>
    </div>
  )
})

export { BoardTaskTableColumn };