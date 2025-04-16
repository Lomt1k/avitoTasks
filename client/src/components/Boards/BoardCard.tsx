import { FC } from 'react';
import { GeneralBoardInfo } from '../../api/Boards';
import { ButtonLink } from '../ui';
import './BoardCard.scss';

type BoardCardProps = {
  board: GeneralBoardInfo;
}

const BoardCard: FC<BoardCardProps> = ({ board }) => {
  return (
    <div className="board-card">
      <div className="board-card__info">
        <div className="board-card__info-top">
          <span className="board-card__title">{board.name}</span>
          <span className="board-card__task-counter">{board.taskCount}</span>
        </div>
        <span>{board.description}</span>
      </div>
      <ButtonLink to={`/board/${board.id}`}>Перейти к доске</ButtonLink>
    </div>
  )
}

export { BoardCard }