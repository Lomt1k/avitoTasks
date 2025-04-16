import { Container, ErrorText } from '../ui';
import { useBoards } from '../../hooks';
import { BoardCardList } from './BoardCardList';
import { LoadingBoardCardList } from './LoadingBoardCardList';

const Boards = () => {
  const { data, isFetching, isError } = useBoards();

  return (
    <section>
      <Container>
        {isFetching && <LoadingBoardCardList />}
        {isError && <ErrorText>При загрузке проектов произошла ошибка 🙄</ErrorText>}
        {data && <BoardCardList boards={data} />}
      </Container>
    </section>
  )
}

export { Boards };