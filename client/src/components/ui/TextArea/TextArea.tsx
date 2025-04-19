import { FC, TextareaHTMLAttributes } from 'react';
import './TextArea.scss';

type TextAreaProps = {
  error?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: FC<TextAreaProps> = ({ error, className, ...rest}) => {
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