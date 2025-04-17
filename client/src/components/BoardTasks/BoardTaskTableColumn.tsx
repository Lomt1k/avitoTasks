import { FC } from 'react';
import { TaskStatus } from '../../api/Task';
import RootStore from '../../store/RootStore';
import { getStatusLocalization } from '../../utils/TaskHelper';
import './BoardTaskTableColumn.scss';

type BoardTaskTableColumnProps = {
  taskStatus: TaskStatus;
}

const BoardTaskTableColumn: FC<BoardTaskTableColumnProps> = ({ taskStatus }) => {
  const tasks = RootStore.tasks.tasks.filter(x => x.status === taskStatus);
  
  return (
    <div className='board-task-table-column'>
      <h2 className="board-task-table-column__heading">
        {getStatusLocalization(taskStatus)}
      </h2>
      <ul className="board-task-table-column__list">

      </ul>
    </div>
  )
}

export { BoardTaskTableColumn };