import { FC } from 'react';
import './ErrorText.scss';

type ErrorTextProps = {
  children: string;
}

const ErrorText: FC<ErrorTextProps> = ({ children }) => {
  return (
    <span className='error-text'>
      {children} 🙄
    </span>
  )
}

export { ErrorText };