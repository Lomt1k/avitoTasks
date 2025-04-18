import RootStore from '../../store/RootStore';
import { TaskCard } from './TaskCard';
import { observer } from 'mobx-react-lite';
import './FilteredTasksList.scss';

const FilteredTasksList = observer(() => {
  // TODO: Запилить логику фильтрации и сортировки
  const search = RootStore.tasks.filterSearch;
  const tasks = RootStore.tasks.tasks
    .filter(task => task.title.toLowerCase().includes(search)
      || task.description.toLowerCase().includes(search)
      || task.assignee.fullName.toLowerCase().includes(search)
      || task.assignee.email.toLowerCase().includes(search)
    );

  return (
    <ul className="filtered-tasks-list">
      {tasks.map(task => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
})

export { FilteredTasksList }