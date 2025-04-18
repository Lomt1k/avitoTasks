import { FC, ReactNode } from 'react';
import { Link } from 'react-router';
import './Button.scss';

type ButtonLinkProps = {
  children: ReactNode;
  to: string;
  secondary?: boolean;
}

const ButtonLink: FC<ButtonLinkProps> = ({ children, to, secondary }) => {
  const classes = 'button'
    + (secondary ? ' button--secondary' : '');
  
  return (
    <Link className={classes} to={to}>
      {children}
    </Link>
  )
}

export { ButtonLink };