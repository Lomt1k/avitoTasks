import { ChangeEventHandler, useEffect } from 'react';
import { TaskStatus } from '../../api/Task';
import { getStatusLocalization } from '../../utils/TaskHelper';
import { Select, SelectItem } from '../ui';
import RootStore from '../../store/RootStore';

const statuses = Object.values(TaskStatus);

const TaskFilterStatus = () => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const status = e.currentTarget.value as TaskStatus;
    const filterStatus = statuses.includes(status) ? status : null;
    RootStore.tasks.setFilterStatus(filterStatus);
  }

  useEffect(() => {
    return () => RootStore.tasks.setFilterStatus(null);
  }, []);

  return (
    <Select
      name='task-filter-status'
      id='task-filter-status'
      onChange={handleChange}
    >
      <SelectItem value='all'>Все статусы</SelectItem>
      {statuses.map(status => (
        <SelectItem key={status} value={status}>
          {getStatusLocalization(status)}
        </SelectItem>
      ))}
    </Select>
  )
}

export { TaskFilterStatus };