import { Button } from "../ui";
import './CreateTaskButton.scss';

const CreateTaskButton = () => {
  const hadleCreateTaskClick = () => {
    // TODO
  }

  return (
    <Button className="create-task-button" onClick={hadleCreateTaskClick}>
      Создать задачу
    </Button>
  )
}

export { CreateTaskButton };