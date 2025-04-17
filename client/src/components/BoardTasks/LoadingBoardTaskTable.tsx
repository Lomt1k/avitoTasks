import { ReactElement } from "react";
import './LoadingBoardTaskTable.scss';

const LoadingBoardTaskTable = () => {
  const content: ReactElement[] = [];
  for (let i = 0; i < 3; i++) {
    content.push(
      <li key={i}>
        <div className="loading-board-task-table__card" />
      </li>
    )
  }

  return (
    <ul className="loading-board-task-table">
      {content}
    </ul>
  )
}

export { LoadingBoardTaskTable };