import { describe, it, expect, vi } from 'vitest';
import { fetchUsers } from './User';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
  },
  validateResponse: vi.fn()
}));

describe('API User :: fetchUsers', () => {
  it('Возвращает массив пользователей', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            avatarUrl: 'http://example.com/avatar1.jpg',
            description: 'Description 1',
            email: 'user1@example.com',
            fullName: 'User 1',
            id: 1,
            tasksCount: 5,
            teamId: 1,
            teamName: 'Team 1',
          },
          {
            avatarUrl: 'http://example.com/avatar2.jpg',
            description: 'Description 2',
            email: 'user2@example.com',
            fullName: 'User 2',
            id: 2,
            tasksCount: 10,
            teamId: 2,
            teamName: 'Team 2',
          },
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    const users = await fetchUsers();

    expect(getSpy).toHaveBeenCalledWith('/users');
    expect(users).toEqual(mockResponse.data.data);
  });

  it('Выбрасывает исключение при некорректном ответе', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            avatarUrl: 'http://example.com/avatar1.jpg',
            description: 'Description 1',
            email: 'user1@example.com',
            fullName: 'User 1',
            id: 1,
            tasksCount: 'invalid',
            teamId: 1,
            teamName: 'Team 1',
          },
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    await expect(fetchUsers()).rejects.toThrow();
  });
});
