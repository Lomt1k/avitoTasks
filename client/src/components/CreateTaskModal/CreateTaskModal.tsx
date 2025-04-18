import { FC } from 'react';
import { Button, ButtonLink, Input, Modal, TextArea } from '../ui';
import { Task, TaskSchema } from '../../api/Task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import './CreateTaskModal.scss';

type CreateTaskModalProps = {
  onClickClose: () => void;
  task?: Task;
}

/// Если таск не прокидывается - это окно создания таска
/// Если прокидывается - окно редактирования

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClickClose, task }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Task>({
    resolver: zodResolver(TaskSchema)
  });

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
}

export { CreateTaskModal };