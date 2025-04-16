import { FC, ReactNode } from 'react';
import { Link } from 'react-router';
import './Button.scss';

type ButtonLinkProps = {
  children: ReactNode;
  to: string;
}

const ButtonLink: FC<ButtonLinkProps> = ({ children, to }) => {
  return (
    <Link className='button' to={to}>
      {children}
    </Link>
  )
}

export { ButtonLink };