import { FC } from 'react';
import './BoardTaskTableColumn.scss';
import { TaskWithoutBoard } from '../../api/Task';

type BoardTaskTableColumnProps = {
  tasks: TaskWithoutBoard[];
}

const BoardTaskTableColumn: FC<BoardTaskTableColumnProps> = ({ tasks }) => {
  return (
    <div className='board-task-table-column'>
      <h2 className="board-task-table-column__heading">
        Столбец тасков
      </h2>
      <ul className="board-task-table-column__list">

      </ul>
    </div>
  )
}

export { BoardTaskTableColumn };