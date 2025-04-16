import { FC } from 'react';
import { GeneralBoardInfo } from '../../api/Boards';
import { BoardCard } from './BoardCard';
import './BoardCardList.scss';

type BoardCardListProps = {
  boards: GeneralBoardInfo[];
}

const BoardCardList: FC<BoardCardListProps> = ({ boards }) => {
  return (
    <ul className="board-card-list">
      {boards.map(board => (
        <li key={board.id}>
          <BoardCard board={board} />
        </li>
      ))}
    </ul>
  )
}

export { BoardCardList };