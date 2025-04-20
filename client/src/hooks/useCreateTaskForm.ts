import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CreateTaskData, CreateTaskSchema, fetchCreateTask } from "../api/Task";
import { useUsers } from "./useUsers";
import RootStore from "../store";

export const useCreateTaskForm = (onClickClose: () => void) => {
  const { newTaskDraft, setNewTaskDraft, clearNewTaskDraft  } = RootStore.drafts;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<CreateTaskData>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: newTaskDraft || {}
  });

  const formData = useWatch({ control });
  useEffect(() => {
    setNewTaskDraft(formData);
  }, [formData, setNewTaskDraft]);

  const { data: users, isError: isUsersError } = useUsers();
  const queryClient = useQueryClient();
  const boards = RootStore.boards.boards;

  const createTaskMutation = useMutation({
    mutationKey: ['task', 'create'],
    mutationFn: fetchCreateTask,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      clearNewTaskDraft();
      onClickClose();
    }
  });

  const onSubmit = handleSubmit(taskData => {
    createTaskMutation.mutate(taskData);
  });

  useEffect(() => {
    const assigneeFromDraft = newTaskDraft?.assigneeId;
    if (users && assigneeFromDraft) {
      setValue('assigneeId', assigneeFromDraft);
    }
  }, [users, newTaskDraft?.assigneeId, setValue]);

  return { register, onSubmit, errors, users, isUsersError, boards };
}