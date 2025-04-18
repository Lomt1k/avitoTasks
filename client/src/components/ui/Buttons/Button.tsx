import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  submit?: boolean;
  secondary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, onClick, submit, className, secondary, ...rest}) => {
  const classes = 'button'
    + (secondary ? ' button--secondary' : '')
    + (className ? ` ${className}` : '');

  return (
    <button
      className={classes}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export { Button };