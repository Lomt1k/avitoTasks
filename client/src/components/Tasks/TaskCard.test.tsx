import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import { Task } from '../../api/Task';
import { getPriorityLocalization, getStatusLocalization } from '../../utils/TaskHelper';

vi.mock('../CreateTaskModal', () => ({
  EditTaskModal: () => <span>Modal</span>,
}));

const task: Task = {
  assignee: {
    avatarUrl: 'http://example.com/avatar.jpg',
    email: 'user@example.com',
    fullName: 'User',
    id: 1,
  },
  boardId: 1,
  boardName: 'Board',
  description: 'Description',
  id: 1,
  priority: 'Low',
  status: 'Backlog',
  title: 'Task',
};

describe('TaskCard', () => {
  it('Рендерится корректно', () => {
    const { getByText, getByAltText } = render(<TaskCard task={task} />);

    expect(getByText('Task')).toBeInTheDocument();
    expect(getByText(getPriorityLocalization(task.priority))).toBeInTheDocument();
    expect(getByText(getStatusLocalization(task.status))).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByAltText('User')).toBeInTheDocument();
    expect(getByText('user@example.com')).toBeInTheDocument();
  });

  it('Обрабатывает событие клика', () => {
    const { getByText } = render(<TaskCard task={task} />);
    fireEvent.click(getByText('Task'));
    expect(getByText('Modal')).toBeInTheDocument();
  });

  it('Снапшот', () => {
    const { container } = render(<TaskCard task={task} />);
    expect(container).toMatchSnapshot();
  });
});
