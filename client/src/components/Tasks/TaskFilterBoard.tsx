import { ChangeEventHandler, useEffect } from 'react';
import { Select, SelectItem } from '../ui';
import { observer } from 'mobx-react-lite';
import RootStore from '../../store/RootStore';
import './TaskFilterBoard.scss';

const TaskFilterBoard = observer(() => {
  const boards = RootStore.boards.boards;

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const boardId = +e.currentTarget.value;
    const filterBoardId = isNaN(boardId) ? null : boardId;
    RootStore.tasks.setFilterBoardId(filterBoardId);
  }

  useEffect(() => {
    return () => RootStore.tasks.setFilterBoardId(null);
  }, []);

  return (
    <Select
      className='task-filter-board'
      name='task-filter-board'
      id='task-filter-board'
      onChange={handleChange}
    >
      <SelectItem value='all'>Все проекты</SelectItem>
      {boards.map(board => (
        <SelectItem key={board.id} value={board.id.toString()}>
          {board.name}
        </SelectItem>
      ))}
    </Select>
  )
})

export { TaskFilterBoard };