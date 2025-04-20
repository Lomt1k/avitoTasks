import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { EditTaskModal } from './EditTaskModal';
import { Task, TaskPriority, TaskStatus } from '../../api/Task';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';
import { BrowserRouter } from 'react-router';

const onClickClose = vi.fn();
const priorities = Object.values(TaskPriority);
const statuses = Object.values(TaskStatus);

const task: Task = {
  assignee: {
    id: 1,
    fullName: 'User 1',
    email: 'user1@example.com',
    avatarUrl: 'http://example.com/avatar1.jpg',
  },
  boardId: 1,
  boardName: 'Board 1',
  description: 'Description',
  id: 1,
  priority: 'Low',
  status: 'Backlog',
  title: 'Task',
};

vi.mock('../../hooks', () => ({
  useEditTaskForm: vi.fn().mockReturnValue({
    register: vi.fn(),
    onSubmit: vi.fn(),
    errors: {},
    users: [
      { id: 1, fullName: 'User 1' },
      { id: 2, fullName: 'User 2' }
    ],
    isUsersError: false,
    boardName: 'Board 1',
  }),
}));

describe('EditTaskModal', () => {
  it('Рендерится корректно', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <EditTaskModal onClickClose={onClickClose} task={task} />
      </BrowserRouter>
    );

    expect(getByText('Редактирование задачи')).toBeInTheDocument();
    expect(getByPlaceholderText('Название')).toBeInTheDocument();
    expect(getByPlaceholderText('Описание')).toBeInTheDocument();
    expect(getByText('Обновить')).toBeInTheDocument();
    expect(getByText('Board 1')).toBeInTheDocument();
    expect(getByText(getPriorityLocalization(priorities[0]))).toBeInTheDocument();
    expect(getByText(getPriorityLocalization(priorities[1]))).toBeInTheDocument();
    expect(getByText(getStatusLocalization(statuses[0]))).toBeInTheDocument();
    expect(getByText(getStatusLocalization(statuses[1]))).toBeInTheDocument();
    expect(getByText('User 1')).toBeInTheDocument();
    expect(getByText('User 2')).toBeInTheDocument();
  });

  it('Снапшот', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
    const { container } = render(
      <BrowserRouter>
        <EditTaskModal onClickClose={onClickClose} task={task} />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
