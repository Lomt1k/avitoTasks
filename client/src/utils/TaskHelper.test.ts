import { describe, it, expect } from 'vitest';
import { getStatusLocalization, getPriorityLocalization } from './TaskHelper';
import { TaskStatus, TaskPriority } from '../api/Task';

describe('TaskHelper :: getStatusLocalization', () => {
  it('Возвращает локализацию статуса задачи', () => {
    expect(getStatusLocalization(TaskStatus.Backlog)).toEqual('Нужно сделать');
    expect(getStatusLocalization(TaskStatus.InProgress)).toEqual('В работе');
    expect(getStatusLocalization(TaskStatus.Done)).toEqual('Выполнено');
    expect(getStatusLocalization('Unknown')).toEqual('Неизвестно');
  });
});

describe('TaskHelper :: getPriorityLocalization', () => {
  it('Возвращает локализацию приоритета задачи', () => {
    expect(getPriorityLocalization(TaskPriority.Low)).toEqual('Низкий');
    expect(getPriorityLocalization(TaskPriority.Medium)).toEqual('Средний');
    expect(getPriorityLocalization(TaskPriority.High)).toEqual('Высокий');
    expect(getPriorityLocalization('Unknown')).toEqual('Неизвестно');
  });
});
