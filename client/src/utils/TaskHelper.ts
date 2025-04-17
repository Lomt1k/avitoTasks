import { TaskPriority, TaskStatus } from "../api/Task";

export const getStatusLocalization = (taskStatus: string): string => {
  if (!Object.values(TaskStatus).includes(taskStatus as TaskStatus)) {
    return 'Неизвестно';
  }

  switch (taskStatus) {
    case TaskStatus.Backlog:
      return 'Нужно сделать';
    case TaskStatus.InProgress:
      return 'В работе';
    case TaskStatus.Done:
      return 'Выполнено';
    default:
      return 'Неизвестно';
  }
}

export const getPriorityLocalization = (priority: string): string => {
  if (!Object.values(TaskPriority).includes(priority as TaskPriority)) {
    return 'Неизвестно';
  }

  switch (priority) {
    case TaskPriority.Low:
      return 'Низкий';
    case TaskPriority.Medium:
      return 'Средний';
    case TaskPriority.High:
      return 'Высокий';
    default:
      return 'Неизвестно';
  }
}