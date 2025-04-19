import { FC } from 'react';
import { Button, ButtonLink, Input, Modal, Select, SelectItem, TextArea } from '../ui';
import { Task, TaskPriority, TaskSchema, TaskStatus } from '../../api/Task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';
import { observer } from 'mobx-react-lite';
import RootStore from '../../store/RootStore';
import './CreateTaskModal.scss';

type CreateTaskModalProps = {
  onClickClose: () => void;
  task?: Task;
}

const priorities = Object.values(TaskPriority);
const statuses = Object.values(TaskStatus);

/// Если таск не прокидывается - это окно создания таска
/// Если прокидывается - окно редактирования

const CreateTaskModal: FC<CreateTaskModalProps> = observer(({ onClickClose, task }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    resolver: zodResolver(TaskSchema)
  });

  const boards = RootStore.boards.boards;
  const currentBoardId = RootStore.boards.currentBoardId;

  return (
    <Modal className='create-task-modal' onClickClose={onClickClose}>
      <form onSubmit={handleSubmit(editedTask => {
        // TODO: mutation
        console.log(editedTask);
      })}
      >
        <h3 className="create-task-modal__heading">
          {task ? 'Редактирование задачи' : 'Создание задачи'}
        </h3>
        <div className="create-task-modal__fields">
          <Input
            {...register('title')}
            type='text'
            defaultValue={task?.title}
            placeholder='Название'
            autoFocus={!task}
            error={errors.title?.message}
          />
          <TextArea
            {...register('description')}
            name='task-description'
            id='task-description'
            defaultValue={task?.description}
            placeholder='Описание'
            error={errors.description?.message}
          />
          <Select
            {...register('boardId')}
            name='task-board'
            id='task-board'
            disabled={!!currentBoardId}
            defaultValue={currentBoardId ?? task?.boardId}
          >
            {boards.map(board => (
              <SelectItem key={board.id} value={board.id.toString()}>
                {board.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            {...register('priority')}
            name='task-priority'
            id='task-priority'
            defaultValue={task?.priority}
          >
            {priorities.map(priority => (
              <SelectItem key={priority} value={priority.toString()}>
                {getPriorityLocalization(priority)}
              </SelectItem>
            ))}
          </Select>
          <Select
            {...register('status')}
            name='task-status'
            id='task-status'
            defaultValue={task?.status}
          >
            {statuses.map(status => (
              <SelectItem key={status} value={status.toString()}>
                {getStatusLocalization(status)}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="create-task-modal__buttons">
          {task?.boardId &&
            <ButtonLink secondary to={`/board/${task.boardId}`}>
              Перейти на доску
            </ButtonLink>
          }
          <Button className='create-task-modal__submit-btn' submit>
            {task ? 'Обновить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Modal>
  )
})

export { CreateTaskModal };