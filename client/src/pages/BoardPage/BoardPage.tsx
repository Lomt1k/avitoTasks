import { useParams } from "react-router";
import { NotFound } from "../../components";
import { BoardTasks } from "../../components/BoardTasks/BoardTasks";

const BoardPage = () => {
  const { id } = useParams();

  if (!id || !Number.isInteger(+id)) {
    return <NotFound text='Проект с таким id не найден' />
  }

  return (
    <main>
      <BoardTasks boardId={+id} />
    </main>
  )
}

export default BoardPage;