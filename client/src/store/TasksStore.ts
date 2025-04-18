import { makeAutoObservable } from "mobx";
import { TaskStatus, Task } from "../api/Task";

export class TasksStore {
  tasks: Task[] = [];
  filterSearch: string = '';
  filterStatus: TaskStatus | null = null;
  filterBoardId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTasks(tasks: Task[] | undefined) {
    this.tasks = tasks ?? [];
  }

  setTaskStatus(taskId: number, status: TaskStatus) {
    this.tasks = this.tasks.map(task => task.id === taskId ? {...task, status} : task);
  }

  setFilterSearch(search: string) {
    this.filterSearch = search.toLowerCase();
  }

  setFilterStatus(status: TaskStatus | null) {
    this.filterStatus = status;
  }

  setFilterBoardId(id: number | null) {
    this.filterBoardId = id;
  }
}