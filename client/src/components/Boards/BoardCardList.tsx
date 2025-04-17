import { BoardCard } from './BoardCard';
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import './BoardCardList.scss';

const BoardCardList = observer(() => {
  const boards = RootStore.boards.boards;

  return (
    <ul className="board-card-list">
      {boards.map(board => (
        <li key={board.id}>
          <BoardCard board={board} />
        </li>
      ))}
    </ul>
  )
})

export { BoardCardList };