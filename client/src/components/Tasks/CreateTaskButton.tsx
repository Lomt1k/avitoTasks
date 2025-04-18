import { useState } from "react";
import { Button } from "../ui";
import { CreateTaskModal } from "../CreateTaskModal/CreateTaskModal";
import './CreateTaskButton.scss';

const CreateTaskButton = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <>
      <Button className="create-task-button" onClick={() => setIsModalOpened(true)}>
        Создать задачу
      </Button>
      {isModalOpened &&
        <CreateTaskModal onClickClose={() => setIsModalOpened(false)} />
      }
    </>
  )
}

export { CreateTaskButton };