import { FC, ReactNode, SelectHTMLAttributes } from 'react';
import IconDropdown from '../../../assets/icons/dropdown.svg?react';
import './Select.scss';

type SelectProps = {
  name: string,
  id: string,
  className?: string,
  children: ReactNode,
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select: FC<SelectProps> = ({ className, children, ...rest }) => {
  const classes = 'select__field' + (className ? ` ${className}` : '');

  return (
    <div className="select">
      <select
        className={classes}
        {...rest}
      >
        {children}
      </select>
      <IconDropdown className='select__arrow' aria-hidden={true} />
    </div>
  )
}

export { Select };