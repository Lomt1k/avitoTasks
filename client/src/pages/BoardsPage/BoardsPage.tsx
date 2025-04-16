import { Boards } from "../../components";

const BoardsPage = () => {
  return (
    <main className="boards-page">
      <h1 className="visually-hidden">Список проектов</h1>
      <Boards />
    </main>
  )
}

export default BoardsPage;