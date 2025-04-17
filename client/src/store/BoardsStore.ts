import { Board } from "../api/Board";

export class BoardsStore {
  boards: Board[] = [];
  currentBoardId: number | null = null;

  get currentBoard(): Board | undefined {
    return this.boards.find(x => x.id === this.currentBoardId);
  }

  setBoards(boards: Board[] | undefined) {
    this.boards = boards ?? [];
  }

  setCurrentBoardId(boardId: number | null) {
    this.currentBoardId = boardId;
  }
}