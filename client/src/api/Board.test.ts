import { describe, it, expect, vi } from 'vitest';
import { fetchBoards } from './Board';
import { api } from './api';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
  },
  validateResponse: vi.fn(),
}));

describe('API Board :: fetchBoards', () => {
  it('Возвращает массив досок', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: 1,
            name: 'Board 1',
            description: 'Description 1',
            taskCount: 5,
          },
          {
            id: 2,
            name: 'Board 2',
            description: 'Description 2',
            taskCount: 10,
          },
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    const boards = await fetchBoards();

    expect(getSpy).toHaveBeenCalledWith('/boards');
    expect(boards).toEqual(mockResponse.data.data);
  });

  it('Выбрасывает исключение при некорректном ответе', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: 1,
            name: 'Board 1',
            description: 'Description 1',
            taskCount: 'invalid',
          },
        ],
      },
    };

    const getSpy = vi.spyOn(api, 'get');
    getSpy.mockResolvedValue(mockResponse);

    await expect(fetchBoards()).rejects.toThrow();
  });
});
