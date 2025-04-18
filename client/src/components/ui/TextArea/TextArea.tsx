import { FC, TextareaHTMLAttributes } from 'react';
import './TextArea.scss';

type TextAreaProps = {
  name: string;
  id: string;
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: FC<TextAreaProps> = ({ name, id, error, className, ...rest}) => {
  const classes = 'textarea'
    + (error ? ' textarea--errror' : '')
    + (className ? ` ${className}` : '');

  return (
    <div className={classes}>
      <textarea
        className='textarea__field'
        {...rest}
      />
      {error && <span className='textarea__error'>{error}</span>}
    </div>
  );
}

export { TextArea };