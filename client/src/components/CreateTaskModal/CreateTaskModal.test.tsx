import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { CreateTaskModal } from './CreateTaskModal';
import { getPriorityLocalization } from '../../utils/TaskHelper';
import { TaskPriority } from '../../api/Task';

const onClickClose = vi.fn();
const priorities = Object.values(TaskPriority);

vi.mock('../../hooks', () => ({
  useCreateTaskForm: vi.fn().mockReturnValue({
    register: vi.fn(),
    onSubmit: vi.fn(),
    errors: {},
    users: [
      { id: 1, fullName: 'User 1' },
      { id: 2, fullName: 'User 2' }
    ],
    isUsersError: false,
    boards: [
      { id: 1, name: 'Board 1' },
      { id: 2, name: 'Board 2' }
    ]
  }),
}));

describe('CreateTaskModal', () => {
  it('Рендерится корректно', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
    const { getByText, getByPlaceholderText } = render(<CreateTaskModal onClickClose={onClickClose} />);

    expect(getByText('Создание задачи')).toBeInTheDocument();
    expect(getByPlaceholderText('Название')).toBeInTheDocument();
    expect(getByPlaceholderText('Описание')).toBeInTheDocument();
    expect(getByText('Создать')).toBeInTheDocument();
    expect(getByText('Board 1')).toBeInTheDocument();
    expect(getByText('Board 2')).toBeInTheDocument();
    expect(getByText(getPriorityLocalization(priorities[0]))).toBeInTheDocument();
    expect(getByText(getPriorityLocalization(priorities[1]))).toBeInTheDocument();
    expect(getByText('User 1')).toBeInTheDocument();
    expect(getByText('User 2')).toBeInTheDocument();
  });

  it('Снапшот', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);
    const { container } = render(<CreateTaskModal onClickClose={onClickClose} />);
    expect(container).toMatchSnapshot();
  });
});
