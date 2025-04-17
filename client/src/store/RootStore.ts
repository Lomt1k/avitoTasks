import { BoardsStore } from "./BoardsStore";
import { TasksStore } from "./TasksStore";

class RootStore {
  boards: BoardsStore = new BoardsStore();
  tasks: TasksStore = new TasksStore();
}

export default new RootStore();