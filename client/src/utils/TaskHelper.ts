import { TaskStatus } from "../api/Task";

export const getStatusLocalization = (taskStatus: TaskStatus): string => {
  switch (taskStatus) {
    case TaskStatus.Backlog:
      return 'Нужно сделать';
    case TaskStatus.InProgress:
      return 'В работе';
    case TaskStatus.Done:
      return 'Выполнено';
  }
}