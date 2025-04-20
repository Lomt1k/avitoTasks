import { describe, it, expect, beforeEach } from 'vitest';
import { TasksStore } from './TasksStore';
import { Task, TaskStatus } from '../api/Task';

describe('TasksStore', () => {
  let store: TasksStore;

  beforeEach(() => {
    store = new TasksStore();
  });

  it('Устанавливает задачи', () => {
    const tasks: Task[] = [
      {
        assignee: {
          avatarUrl: 'http://example.com/avatar1.jpg',
          email: 'user1@example.com',
          fullName: 'User 1',
          id: 1,
        },
        boardId: 1,
        boardName: 'Board 1',
        description: 'Description 1',
        id: 1,
        priority: 'Low',
        status: 'Backlog',
        title: 'Task 1',
      },
      {
        assignee: {
          avatarUrl: 'http://example.com/avatar2.jpg',
          email: 'user2@example.com',
          fullName: 'User 2',
          id: 2,
        },
        boardId: 2,
        boardName: 'Board 2',
        description: 'Description 2',
        id: 2,
        priority: 'Medium',
        status: 'InProgress',
        title: 'Task 2',
      },
    ];

    store.setTasks(tasks);

    expect(store.tasks).toEqual(tasks);
  });

  it('Устанавливает статус задачи', () => {
    const tasks: Task[] = [
      {
        assignee: {
          avatarUrl: 'http://example.com/avatar1.jpg',
          email: 'user1@example.com',
          fullName: 'User 1',
          id: 1,
        },
        boardId: 1,
        boardName: 'Board 1',
        description: 'Description 1',
        id: 1,
        priority: 'Low',
        status: 'Backlog',
        title: 'Task 1',
      },
      {
        assignee: {
          avatarUrl: 'http://example.com/avatar2.jpg',
          email: 'user2@example.com',
          fullName: 'User 2',
          id: 2,
        },
        boardId: 2,
        boardName: 'Board 2',
        description: 'Description 2',
        id: 2,
        priority: 'Medium',
        status: 'InProgress',
        title: 'Task 2',
      },
    ];
    store.setTasks(tasks);

    store.setTaskStatus(1, TaskStatus.Done);

    expect(store.tasks[0].status).toEqual('Done');
  });

  it('Устанавливает фильтр поиска', () => {
    store.setFilterSearch('search');

    expect(store.filterSearch).toEqual('search');
  });

  it('Устанавливает фильтр по статусу', () => {
    store.setFilterStatus(TaskStatus.Done);

    expect(store.filterStatus).toEqual('Done');
  });

  it('Устанавливает фильтр по доске', () => {
    store.setFilterBoardId(1);

    expect(store.filterBoardId).toEqual(1);
  });
});
