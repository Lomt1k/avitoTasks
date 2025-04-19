import { Container, ErrorText } from '../ui';
import { useBoards } from '../../hooks';
import { BoardCardList } from './BoardCardList';
import { LoadingBoardCardList } from './LoadingBoardCardList';
import { useEffect } from 'react';
import RootStore from '../../store/RootStore';
import { observer } from 'mobx-react-lite';
import "./Boards.scss";

const Boards = observer(() => {
  const { data, isFetching, isError } = useBoards();
  useEffect(() => RootStore.boards.setBoards(data), [data]);

  const hasBoards = RootStore.boards.boards.length > 0;

  return (
    <section className='boards'>
      <Container>
        <div className="boards__wrapper">
          {isFetching && !hasBoards && <LoadingBoardCardList />}
          {isError && <ErrorText>При загрузке проектов произошла ошибка</ErrorText>}
          {hasBoards && !isError && <BoardCardList />}
        </div>
      </Container>
    </section>
  )
})

export { Boards };