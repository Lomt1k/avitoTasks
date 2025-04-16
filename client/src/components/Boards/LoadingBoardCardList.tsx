import { ReactElement } from 'react';
import './LoadingBoardCardList.scss';

const LoadingBoardCardList = () => {
  const elements: ReactElement[] = [];
  for (let i = 0; i < 3; i++) {
    elements.push(
      <li key={i}>
        <div className="loading-board-card-list__card" />
      </li>
    );
  }

  return (
    <ul className="loading-board-card-list">
      {elements}
    </ul>
  )
}

export { LoadingBoardCardList };