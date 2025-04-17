import { MainNav } from "..";
import { CreateTaskButton } from "../Tasks";
import { Container } from "../ui";
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <MainNav />
          <CreateTaskButton />
        </div>
      </Container>
    </header>
  )
}

export { Header };