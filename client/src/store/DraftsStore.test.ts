import { describe, it, expect, beforeEach } from 'vitest';
import { DraftsStore } from './DraftsStore';
import { CreateTaskData, UpdateTaskData } from '../api/Task';

describe('DraftsStore', () => {
  let store: DraftsStore;

  beforeEach(() => {
    store = new DraftsStore();
  });

  it('Загружает черновик создаваемого таска из localStorage', () => {
    const draft = {
      title: 'New Task',
      description: 'New Task Description',
      priority: 'High',
    };
    localStorage.setItem('newTaskDraft', JSON.stringify(draft));
    store = new DraftsStore();

    expect(store.newTaskDraft).toEqual(draft);
  });

  it('Устанавливает черновик создаваемого таска', () => {
    const taskData: Partial<CreateTaskData> = {
      title: 'New Task',
      description: 'New Task Description',
      priority: 'High',
    };

    store.setNewTaskDraft(taskData);

    expect(store.newTaskDraft).toEqual(taskData);
    expect(localStorage.getItem('newTaskDraft')).toEqual(JSON.stringify(taskData));
  });

  it('Очищает черновик создаваемого таска', () => {
    const taskData: Partial<CreateTaskData> = {
      title: 'New Task',
      description: 'New Task Description',
      priority: 'High',
    };
    store.setNewTaskDraft(taskData);

    store.clearNewTaskDraft();

    expect(store.newTaskDraft).toBeNull();
    expect(localStorage.getItem('newTaskDraft')).toBeNull();
  });

  it('Устанавливает черновик редактируемого таска', () => {
    const taskId = 1;
    const taskData: Partial<UpdateTaskData> = {
      title: 'Updated Task',
      description: 'Updated Task Description',
      priority: 'Medium',
      status: 'InProgress',
    };

    store.setEditTaskDraft(taskId, taskData);

    expect(store.editTaskDrafts[taskId]).toEqual(taskData);
  });

  it('Получает черновик редактируемого таска', () => {
    const taskId = 1;
    const taskData: Partial<UpdateTaskData> = {
      title: 'Updated Task',
      description: 'Updated Task Description',
      priority: 'Medium',
      status: 'InProgress',
    };
    store.setEditTaskDraft(taskId, taskData);

    expect(store.getEditTaskDraft(taskId)).toEqual(taskData);
  });

  it('Очищает черновик редактируемого таска', () => {
    const taskId = 1;
    const taskData: Partial<UpdateTaskData> = {
      title: 'Updated Task',
      description: 'Updated Task Description',
      priority: 'Medium',
      status: 'InProgress',
    };
    store.setEditTaskDraft(taskId, taskData);

    store.clearEditTaskDraft(taskId);

    expect(store.editTaskDrafts[taskId]).toBeUndefined();
  });
});
