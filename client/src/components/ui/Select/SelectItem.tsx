import { FC, OptionHTMLAttributes, ReactNode } from 'react';
import './SelectItem.scss';

type SelectItemProps = {
  value: string;
  children: ReactNode;
  className?: string;
} & OptionHTMLAttributes<HTMLOptionElement>;

const SelectItem: FC<SelectItemProps> = ({ value, children, className, ...rest }) => {
  const classes = 'select-item' + (className ? ` ${className}` : '');
  
  return (
    <option
      className={classes}
      value={value}
      {...rest}
    >
      {children}
    </option>
  )
}

export { SelectItem };