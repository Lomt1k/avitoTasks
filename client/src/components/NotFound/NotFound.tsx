import { FC } from 'react';
import { ButtonLink, Container } from '../ui';
import './NotFound.scss';

type NotFountProps = {
  text: string;
}

const NotFound: FC<NotFountProps> = ({ text }) => {
  return (
    <section className="not-found">
      <Container>
        <div className="not-found__wrapper">
          <p className="not-found__text">
            {text} 😥
          </p>
          <ButtonLink to={'/'}>На главную</ButtonLink>
        </div>
      </Container>
    </section>
  )
}

export { NotFound };