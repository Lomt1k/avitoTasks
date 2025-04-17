import { useEffect } from 'react';
import { useAllTasks } from '../../hooks';
import RootStore from '../../store/RootStore';
import { Container } from '../ui';
import { FilteredTasksList } from './FilteredTasksList';
import './AllTasks.scss';

const AllTasks = () => {
  const { data, isFetching, isError } = useAllTasks();
  useEffect(() => RootStore.tasks.setTasks(data), [data]);
  
  return (
    <section className="all-tasks">
      <Container>
        <div className="all-tasks__wrapper">
          <div className="all-tasks__controls">
            {/* TODO: Тут будет поиск + фильтры */}
            [CONTROLS]
          </div>
          <FilteredTasksList />
        </div>
      </Container>
    </section>
  )
}

export { AllTasks };