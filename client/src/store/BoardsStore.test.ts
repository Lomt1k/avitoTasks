import { describe, it, expect, beforeEach } from 'vitest';
import { BoardsStore } from './BoardsStore';
import { Board } from '../api/Board';

describe('BoardsStore', () => {
  let store: BoardsStore;

  beforeEach(() => {
    store = new BoardsStore();
  });

  it('Устанавливает доски', () => {
    const boards: Board[] = [
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
    ];

    store.setBoards(boards);

    expect(store.boards).toEqual(boards);
  });

  it('Устанавливает текущую доску', () => {
    const boards: Board[] = [
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
    ];
    store.setBoards(boards);
    store.setCurrentBoardId(1);

    expect(store.currentBoardId).toEqual(1);
    expect(store.currentBoard).toEqual(boards[0]);
  });

  it('Очищает текущую доску', () => {
    const boards: Board[] = [
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
    ];
    store.setBoards(boards);
    store.setCurrentBoardId(null);

    expect(store.currentBoardId).toBeNull();
    expect(store.currentBoard).toBeUndefined();
  });
});
