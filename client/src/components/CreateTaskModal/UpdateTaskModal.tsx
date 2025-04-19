import { FC, useEffect } from 'react';
import { Button, ButtonLink, Input, Modal, Select, SelectItem, TextArea } from '../ui';
import { fetchUpdateTask, Task, TaskPriority, TaskStatus, UpdateTaskData, UpdateTaskSchema } from '../../api/Task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';
import { observer } from 'mobx-react-lite';
import RootStore from '../../store/RootStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUsers } from '../../hooks';
import './TaskModal.scss';

type UpdateTaskModalProps = {
  onClickClose: () => void;
  task: Task;
}

const priorities = Object.values(TaskPriority);
const statuses = Object.values(TaskStatus);

const UpdateTaskModal: FC<UpdateTaskModalProps> = observer(({ onClickClose, task }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateTaskData>({
    resolver: zodResolver(UpdateTaskSchema)
  });
  const { data: users, isError: isUsersError } = useUsers();
  const queryClient = useQueryClient();
  const boardName = task.boardName ?? RootStore.boards.currentBoard?.name;

  const updateTaskMutation = useMutation({
    mutationKey: ['task', 'update', task.id],
    mutationFn: ({ id, taskUpdate }: { id: number; taskUpdate: UpdateTaskData }) => {
      return fetchUpdateTask(id, taskUpdate);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClickClose();
    }
  });

  useEffect(() => {
    if (users && task.assignee.id) {
      setValue('assigneeId', task.assignee.id);
    }
  }, [users, task.assignee.id]);

  return (
    <Modal className='task-modal' onClickClose={onClickClose}>
      <form onSubmit={handleSubmit(taskUpdate => {
        updateTaskMutation.mutate({ id: task.id, taskUpdate });
      })}
      >
        <h3 className="task-modal__heading">Редактирование задачи</h3>
        <div className="task-modal__fields">
          <Input
            placeholder='Название'
            type='text'
            defaultValue={task.title}
            error={errors.title?.message}
            {...register('title')}
          />
          <TextArea
            placeholder='Описание'
            defaultValue={task.description}
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
            defaultValue={task.priority}
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
            defaultValue={task.status}
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
            defaultValue={task.assignee.id}
            error={isUsersError ? 'Произошла ошибка при подгрузке пользователей' : errors.assigneeId?.message}
            {...register('assigneeId', { setValueAs: value => Number(value) })}
          >
            {users && users.map(user => (
              <SelectItem key={user.id} value={user.id.toString()} defaultChecked={user.id === task.assignee.id}>
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
          <Button className='task-modal__submit-btn' submit>
            Обновить
          </Button>
        </div>
      </form>
    </Modal>
  )
})

export { UpdateTaskModal };