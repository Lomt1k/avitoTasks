import { FormEventHandler } from "react";
import { Input } from "../ui";
import IconSearch from '/src/assets/icons/search.svg?react';
import RootStore from "../../store/RootStore";
import './TaskSearch.scss';

const TaskSearch = () => {
  const handleInput: FormEventHandler<HTMLInputElement> = (e) => {
    RootStore.tasks.setFilterSearch(e.currentTarget.value);
  }

  return (
    <Input
      className="task-search"
      icon={<IconSearch width={16} height={16} aria-hidden={true} />}
      onInput={handleInput}
      placeholder="Поиск"
      type='search'
    />
  )
}

export { TaskSearch };