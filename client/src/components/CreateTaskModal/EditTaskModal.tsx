import { FC } from 'react';
import { Button, ButtonLink, Input, Modal, Select, SelectItem, TextArea } from '../ui';
import { Task, TaskPriority, TaskStatus } from '../../api/Task';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';
import { observer } from 'mobx-react-lite';
import { useEditTaskForm } from '../../hooks';
import './TaskModal.scss';

type EditTaskModalProps = {
  onClickClose: () => void;
  task: Task;
}

const priorities = Object.values(TaskPriority);
const statuses = Object.values(TaskStatus);

const EditTaskModal: FC<EditTaskModalProps> = observer(({ onClickClose, task }) => {
  const { register, onSubmit, errors, users, isUsersError, boardName } = useEditTaskForm(task, onClickClose);

  return (
    <Modal className='task-modal' onClickClose={onClickClose}>
      <form className='task-modal__form' onSubmit={onSubmit}>
        <h3 className="task-modal__heading">Редактирование задачи</h3>
        <div className="task-modal__fields">
          <Input
            placeholder='Название'
            type='text'
            error={errors.title?.message}
            {...register('title')}
          />
          <TextArea
            placeholder='Описание'
            error={errors.description?.message}
            {...register('description')}
          />
          {boardName &&
            <Select disabled>
              <SelectItem value={boardName}>
                {boardName}
              </SelectItem>
            </Select>
          }
          <Select
            error={errors.priority?.message}
            {...register('priority')}
          >
            {priorities.map(priority => (
              <SelectItem key={priority} value={priority.toString()}>
                {getPriorityLocalization(priority)}
              </SelectItem>
            ))}
          </Select>
          <Select
            error={errors.status?.message}
            {...register('status')}
          >
            {statuses.map(status => (
              <SelectItem key={status} value={status.toString()}>
                {getStatusLocalization(status)}
              </SelectItem>
            ))}
          </Select>
          <Select
            error={isUsersError ? 'Произошла ошибка при подгрузке пользователей' : errors.assigneeId?.message}
            {...register('assigneeId', { setValueAs: value => Number(value) })}
          >
            {users && users.map(user => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.fullName}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="task-modal__buttons">
          {task.boardId &&
            <ButtonLink secondary to={`/board/${task.boardId}`}>
              Перейти на доску
            </ButtonLink>
          }
          <Button className='task-modal__submit-btn' submit>Обновить</Button>
        </div>
      </form>
    </Modal>
  )
})

export { EditTaskModal };