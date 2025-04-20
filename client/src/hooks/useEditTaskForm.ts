import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { fetchUpdateTask, Task, UpdateTaskData, UpdateTaskSchema } from "../api/Task";
import { useUsers } from "./useUsers";
import RootStore from "../store";

export const useEditTaskForm = (task: Task, onClickClose: () => void) => {
  const { setEditTaskDraft, clearEditTaskDraft } = RootStore.drafts;
  const taskDraft = RootStore.drafts.getEditTaskDraft(task.id);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<UpdateTaskData>({
    resolver: zodResolver(UpdateTaskSchema),
    defaultValues: taskDraft ?? task
  });

  const formData = useWatch({ control });
  useEffect(() => {
    setEditTaskDraft(task.id, formData);
  }, [formData, setEditTaskDraft, task.id]);

  const { data: users, isError: isUsersError } = useUsers();
  const queryClient = useQueryClient();
  const boardName = task.boardName ?? RootStore.boards.currentBoard?.name;

  const updateTaskMutation = useMutation({
    mutationKey: ['task', 'update', task.id],
    mutationFn: ({ id, taskUpdate }: { id: number; taskUpdate: UpdateTaskData }) => {
      return fetchUpdateTask(id, taskUpdate);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      clearEditTaskDraft(task.id);
      onClickClose();
    }
  });

  const onSubmit = handleSubmit(taskUpdate => {
    updateTaskMutation.mutate({ id: task.id, taskUpdate });
  });

  useEffect(() => {
    const assigneeId = taskDraft?.assigneeId ?? task.assignee.id;
    if (users && assigneeId) {
      setValue('assigneeId', assigneeId);
    }
  }, [users, task.assignee.id, taskDraft?.assigneeId, setValue]);

  return { register, onSubmit, errors, users, isUsersError, boardName };
}