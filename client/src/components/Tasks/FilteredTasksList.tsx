import RootStore from '../../store/RootStore';
import { TaskCard } from './TaskCard';
import { observer } from 'mobx-react-lite';
import './FilteredTasksList.scss';

const FilteredTasksList = observer(() => {
  const filterSearch = RootStore.tasks.filterSearch;
  const filterStatus = RootStore.tasks.filterStatus;
  const filterBoardId = RootStore.tasks.filterBoardId;

  const tasks = RootStore.tasks.tasks
    .filter(task => filterStatus ? task.status === filterStatus : true)
    .filter(task => filterBoardId ? task.boardId === filterBoardId : true)
    .filter(task => task.title.toLowerCase().includes(filterSearch)
      || task.description.toLowerCase().includes(filterSearch)
      || task.assignee.fullName.toLowerCase().includes(filterSearch)
      || task.assignee.email.toLowerCase().includes(filterSearch)
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