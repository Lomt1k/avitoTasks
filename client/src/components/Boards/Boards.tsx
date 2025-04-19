import { Container, ErrorText } from '../ui';
import { useBoards } from '../../hooks';
import { BoardCardList } from './BoardCardList';
import { LoadingBoardCardList } from './LoadingBoardCardList';
import { useEffect } from 'react';
import RootStore from '../../store/RootStore';
import "./Boards.scss";

const Boards = () => {
  const { data, isFetching, isError } = useBoards();
  useEffect(() => RootStore.boards.setBoards(data), [data]);

  return (
    <section className='boards'>
      <Container>
        <div className="boards__wrapper">
          {isFetching && <LoadingBoardCardList />}
          {isError && <ErrorText>При загрузке проектов произошла ошибка</ErrorText>}
          {data && <BoardCardList />}
        </div>
      </Container>
    </section>
  )
}

export { Boards };