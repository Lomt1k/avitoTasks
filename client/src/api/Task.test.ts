import { describe, it, expect, vi } from 'vitest';
import { fetchTasksFromBoard, fetchAllTasks, fetchCreateTask, fetchUpdateTask, fetchUpdateTaskStatus, TaskStatus } from './Task';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
  validateResponse: vi.fn()
}));

describe('API Task :: fetchTasksFromBoard', () => {
  it('Возвращает массив задач', async () => {
    const mockResponse = {
      data: {
        data: [
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
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    const tasks = await fetchTasksFromBoard(1);

    expect(getSpy).toHaveBeenCalledWith('/boards/1');
    expect(tasks).toEqual(mockResponse.data.data);
  });

  it('Выбрасывает исключение при некорректном ответе', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: '>>> INCORRECT_ID <<<',
          }
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    await expect(fetchTasksFromBoard(1)).rejects.toThrow();
  });
});

describe('API Task :: fetchAllTasks', () => {
  it('Возвращает массив задач', async () => {
    const mockResponse = {
      data: {
        data: [
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
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    const tasks = await fetchAllTasks();

    expect(getSpy).toHaveBeenCalledWith('/tasks');
    expect(tasks).toEqual(mockResponse.data.data);
  });

  it('Выбрасывает исключение при некорректном ответе', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: '>>> INCORRECT_ID <<<'
          }
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    await expect(fetchAllTasks()).rejects.toThrow();
  });
});

describe('API Task :: fetchCreateTask', () => {
  it('Создает задачу', async () => {
    const mockResponse = {
      data: {},
    };

    const postSpy = vi.spyOn(api, 'post');
    postSpy.mockResolvedValue(mockResponse);

    const data = {
      assigneeId: 1,
      boardId: 1,
      title: 'New Task',
      description: 'New Task Description',
      priority: 'High',
    };

    await fetchCreateTask(data);

    expect(postSpy).toHaveBeenCalledWith('/tasks/create', data);
  });
});

describe('API Task :: fetchUpdateTask', () => {
  it('Обновляет задачу', async () => {
    const mockResponse = {
      data: {},
    };

    const putSpy = vi.spyOn(api, 'put');
    putSpy.mockResolvedValue(mockResponse);

    const taskId = 1;
    const data = {
      assigneeId: 1,
      title: 'Updated Task',
      description: 'Updated Task Description',
      priority: 'Medium',
      status: 'InProgress',
    };

    await fetchUpdateTask(taskId, data);

    expect(putSpy).toHaveBeenCalledWith(`/tasks/update/${taskId}`, data);
  });
});

describe('API Task :: fetchUpdateTaskStatus', () => {
  it('Обновляет статус задачи', async () => {
    const mockResponse = {
      data: {},
    };

    const putSpy = vi.spyOn(api, 'put');
    putSpy.mockResolvedValue(mockResponse);

    const taskId = 1;
    const status = TaskStatus.Done;

    await fetchUpdateTaskStatus(taskId, status);

    expect(putSpy).toHaveBeenCalledWith(`/tasks/updateStatus/${taskId}`, { status });
  });
});
