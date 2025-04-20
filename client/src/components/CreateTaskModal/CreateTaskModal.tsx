import { FC } from 'react';
import { Button, Input, Modal, Select, SelectItem, TextArea } from '../ui';
import { TaskPriority } from '../../api/Task';
import { getPriorityLocalization } from '../../utils/TaskHelper';
import { observer } from 'mobx-react-lite';
import { useCreateTaskForm } from '../../hooks';
import './TaskModal.scss';

type CreateTaskModalProps = {
  onClickClose: () => void;
}

const priorities = Object.values(TaskPriority);

const CreateTaskModal: FC<CreateTaskModalProps> = observer(({ onClickClose }) => {
  const { register, onSubmit, errors, users, isUsersError, boards } = useCreateTaskForm(onClickClose);

  return (
    <Modal className='task-modal' onClickClose={onClickClose}>
      <form className='task-modal__form' onSubmit={onSubmit}>
        <h3 className="task-modal__heading">Создание задачи</h3>
        <div className="task-modal__fields">
          <Input
            type='text'
            placeholder='Название'
            autoFocus
            error={errors.title?.message}
            {...register('title')}
          />
          <TextArea
            placeholder='Описание'
            error={errors.description?.message}
            {...register('description')}
          />
          <Select
            error={errors.boardId?.message}
            {...register('boardId', { setValueAs: value => Number(value) })}
          >
            {boards.map(board => (
              <SelectItem key={board.id} value={board.id.toString()}>
                {board.name}
              </SelectItem>
            ))}
          </Select>
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
          <Button className='task-modal__submit-btn' submit>Создать</Button>
        </div>
      </form>
    </Modal>
  )
})

export { CreateTaskModal };