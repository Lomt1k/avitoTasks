import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, onClick, className, ...rest}) => {
  const classes = 'button' + (className ? ` ${className}` : '');

  return (
    <button
      className={classes}
      type='button'
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export { Button };