import { BoardsStore } from "./BoardsStore";
import { DraftsStore } from "./DraftsStore";
import { TasksStore } from "./TasksStore";

class RootStore {
  boards: BoardsStore = new BoardsStore();
  tasks: TasksStore = new TasksStore();
  drafts: DraftsStore = new DraftsStore();
}

export default new RootStore();