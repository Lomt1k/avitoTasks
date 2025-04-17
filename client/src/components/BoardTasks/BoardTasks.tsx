import { FC, useEffect } from 'react';
import { Container, ErrorText } from '../ui';
import { useBoardTasks } from '../../hooks';
import { BoardTaskTable } from './BoardTaskTable';
import RootStore from '../../store/RootStore';
import './BoardTasks.scss';

type BoardTasksProps = {
  boardId: number;
}

const BoardTasks: FC<BoardTasksProps> = ({ boardId }) => {
  const { data, isFetching, isError } = useBoardTasks(boardId);
  const boardName = RootStore.boards.currentBoard?.name ?? `Проект ID ${boardId}`;

  useEffect(() => RootStore.tasks.setTasks(data), [data]);

  useEffect(() => {
    RootStore.boards.setCurrentBoardId(boardId);
    return () => RootStore.boards.setCurrentBoardId(null);
  }, [boardId]);

  return (
    <section className='board-tasks'>
      <Container>
        <h1 className="board-tasks__title">{boardName}</h1>
        {isError && <ErrorText>При загрузке задач произошла ошибка</ErrorText>}
        {data && <BoardTaskTable />}
      </Container>
    </section>
  )
}

export { BoardTasks };