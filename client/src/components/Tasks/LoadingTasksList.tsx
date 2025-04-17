import { ReactElement } from "react";
import './LoadingTasksList.scss';

const LoadingTasksList = () => {
  const elements: ReactElement[] = [];
  for (let i = 0; i < 3; i++) {
    elements.push(
      <li key={i}>
        <div className="loading-tasks-list__card" />
      </li>
    )
  }

  return (
    <ul className="loading-tasks-list">
      {elements}
    </ul>
  )
}

export { LoadingTasksList };