import RootStore from '../../store/RootStore';
import { TaskCard } from './TaskCard';
import { observer } from 'mobx-react-lite';
import './FilteredTasksList.scss';

const FilteredTasksList = observer(() => {
  // TODO: Запилить логику фильтрации и сортировки
  const tasks = RootStore.tasks.tasks;
  
  return (
    <ul className="filtered-tasks-list">
      {tasks.map(task => (
        <li>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
})

export { FilteredTasksList }