import { FC, memo, useState } from 'react';
import { Task } from '../../api/Task';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';
import { UpdateTaskModal } from '../CreateTaskModal';
import './TaskCard.scss';

type TaskCardProps = {
  task: Task,
}

const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <button className="task-card" onClick={() => setIsModalOpened(true)} type="button">
        <div className="task-card__info">
          <h4 className="task-card__title">{task.title}</h4>
          <div className="task-card__stickers">
            <span className="task-card__sticker">{getPriorityLocalization(task.priority)}</span>
            <span className="task-card__sticker">{getStatusLocalization(task.status)}</span>
          </div>
          <p className="task-card__desc">{task.description}</p>
        </div>
        <div className="task-card__user">
          <img
            className="task-card__user-avatar"
            src={task.assignee.avatarUrl}
            alt={task.assignee.fullName}
            height={45}
          />
          <div className="task-card__user-info">
            <span className="task-card__user-name">{task.assignee.fullName}</span>
            <a
              href={`mailto:${task.assignee.email}`}
              className="task-card__user-email"
              onClick={(e) => e.stopPropagation()}
            >
              {task.assignee.email}
            </a>
          </div>
        </div>
      </button>
      {isModalOpened &&
        <UpdateTaskModal task={task} onClickClose={() => setIsModalOpened(false)} />
      }
    </>
  );
});

export { TaskCard };