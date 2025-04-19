import { FC, ReactNode, SelectHTMLAttributes } from 'react';
import IconDropdown from '../../../assets/icons/dropdown.svg?react';
import './Select.scss';

type SelectProps = {
  children: ReactNode,
  className?: string,
  error?: string,
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<SelectProps> = ({ className, children, error, ...rest }) => {
  const classes = 'select__field' + (className ? ` ${className}` : '');

  return (
    <div className="select">
      <select
        className={classes}
        {...rest}
      >
        {children}
      </select>
      {error && <span className='select__error'>{error}</span>}
      <IconDropdown className='select__arrow' aria-hidden={true} />
    </div>
  )
}

export { Select };