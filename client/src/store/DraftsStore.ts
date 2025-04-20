import { makeAutoObservable } from "mobx";
import { CreateTaskData, UpdateTaskData } from "../api/Task";

// Черновик создаваемого таска храним в localStorage чтобы он был доступен долговременно
// Черновик редатируемого таска храним кратковременно - на случай случайно закрытой модалки

class DraftsStore {
  newTaskDraft: Partial<CreateTaskData> | null = null;
  editTaskDrafts: Record<number, Partial<UpdateTaskData>> = {};

  constructor() {
    this.loadFromLocalStorage();
    makeAutoObservable(this);
  }

  private loadFromLocalStorage = () => {
    const draft = localStorage.getItem('newTaskDraft');
    if (draft) {
      this.newTaskDraft = JSON.parse(draft);
    }
  }

  setNewTaskDraft = (taskData: Partial<CreateTaskData>) => {
    this.newTaskDraft = taskData;
    localStorage.setItem('newTaskDraft', JSON.stringify(taskData));
  }

  clearNewTaskDraft = () => {
    this.newTaskDraft = null;
    localStorage.removeItem('newTaskDraft');
  }

  setEditTaskDraft = (taskId: number, taskData: Partial<UpdateTaskData>) => {
    this.editTaskDrafts[taskId] = taskData;
  }

  getEditTaskDraft = (taskId: number): Partial<UpdateTaskData> | null => {
    return this.editTaskDrafts[taskId] ?? null;
  }

  clearEditTaskDraft = (taskId: number) => {
    delete this.editTaskDrafts[taskId];
  }
}

export { DraftsStore };