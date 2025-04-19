import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskStatus, fetchUpdateTaskStatus } from '../api/Task';
import RootStore from '../store/RootStore';

const useTasksDragAndDrop = () => {
  const [draggingTaskId, setDraggingTaskId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationKey: ['tasks', 'status', 'update', draggingTaskId],
    mutationFn: ({ taskId, status }: { taskId: number; status: TaskStatus }) => {
      return fetchUpdateTaskStatus(taskId, status);
    },
    onError() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleDragStart = (taskId: number) => {
    setDraggingTaskId(taskId);
  };

  const handleDrop = (targetStatus: TaskStatus) => {
    if (draggingTaskId === null) {
      return;
    }

    RootStore.tasks.setTaskStatus(draggingTaskId, targetStatus);
    updateStatusMutation.mutate({ taskId: draggingTaskId, status: targetStatus })
    setDraggingTaskId(null);
  };

  return { handleDragStart, handleDrop };
}

export { useTasksDragAndDrop };