import { MainNav } from "..";
import { Button, Container } from "../ui";
import './Header.scss';

const Header = () => {
  const hadleCreateIssueClick = () => {
    // TODO
  }

  return (
    <header className="header">
      <Container>
        <div className="header__wrapper">
          <MainNav />
          <Button onClick={hadleCreateIssueClick}>Создать задачу</Button>
        </div>
      </Container>
    </header>
  )
}

export { Header };