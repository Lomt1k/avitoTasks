import { FC, ReactElement, InputHTMLAttributes } from 'react';
import './Input.scss';

type InputProps = {
  icon?: ReactElement;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ icon, error, className, ...rest }) => {
  const classes = 'input'
    + (icon ? ' input--with-icon' : '')
    + (error ? ' input--errror' : '')
    + (className ? ` ${className}` : '');

  return (
    <div className={classes}>
      <input
        className='input__field'
        {...rest}
      />
      {icon && <span className='input__icon'>{icon}</span>}
      {error && <span className='input__error'>{error}</span>}
    </div>
  );
};

export { Input }