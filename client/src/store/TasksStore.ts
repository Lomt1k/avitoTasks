import { makeAutoObservable } from "mobx";
import { TaskStatus, Task } from "../api/Task";

export class TasksStore {
  tasks: Task[] = [];
  filterSearch: string = '';
  filterSortType: string | null = null;

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
    this.filterSearch = search;
  }

  setFilterSortType(sortType: string | null) {
    this.filterSortType = sortType;
  }
}