import { FC } from 'react';
import { Container, ErrorText } from '../ui';
import { useBoardTasks } from '../../hooks';
import { BoardTaskTable } from './BoardTaskTable';

type BoardTasksProps = {
  boardId: number;
}

const BoardTasks: FC<BoardTasksProps> = ({ boardId }) => {
  const { data, isFetching, isError } = useBoardTasks(boardId);

  return (
    <section>
      <Container>
        {isError && <ErrorText>При загрузке задач произошла ошибка 🙄</ErrorText>}
        {data && <BoardTaskTable tasks={data} />}
      </Container>
    </section>
  )
}

export { BoardTasks };