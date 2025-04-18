import { FC } from 'react';
import { Modal } from '../ui';
import { Task } from '../../api/Task';
import './CreateTaskModal.scss';

type CreateTaskModalProps = {
  onClickClose: () => void;
  task?: Task;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClickClose, task }) => {
  return (
    <Modal className='create-task-modal' onClickClose={onClickClose}>
      <h3 className="create-task-modal__heading">
        {task ? 'Редактирование задачи' : 'Создание задачи'}
      </h3>
    </Modal>
  )
}

export { CreateTaskModal };