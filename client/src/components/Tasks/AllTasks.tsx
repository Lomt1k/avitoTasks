import { useEffect } from 'react';
import { useAllTasks } from '../../hooks';
import RootStore from '../../store/RootStore';
import { Container, ErrorText } from '../ui';
import { FilteredTasksList } from './FilteredTasksList';
import { CreateTaskButton } from './CreateTaskButton';
import { LoadingTasksList } from './LoadingTasksList';
import { TaskSearch } from './TaskSearch';
import './AllTasks.scss';

const AllTasks = () => {
  const { data, isFetching, isError } = useAllTasks();
  useEffect(() => RootStore.tasks.setTasks(data), [data]);

  return (
    <section className="all-tasks">
      <Container>
        <div className="all-tasks__wrapper">
          <div className="all-tasks__controls">
            <TaskSearch />
          </div>
          {isFetching && <LoadingTasksList />}
          {isError && <ErrorText>При загрузке задач произошла ошибка</ErrorText>}
          {data &&
            <>
              <FilteredTasksList />
              <CreateTaskButton />
            </>
          }
        </div>
      </Container>
    </section>
  )
}

export { AllTasks };