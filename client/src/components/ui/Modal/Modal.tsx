import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './ModalOverlay';
import IconClose from '/src/assets/icons/close.svg?react';
import './Modal.scss';

type ModalProps = {
  children: ReactNode;
  onClickClose: () => void;
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, onClickClose, className }) => {
  const classes = 'modal' + (className ? ` ${className}` : '');

  return createPortal(
    <ModalOverlay onClickClose={onClickClose}>
      <div className={classes}>
        <button
          className='modal__close-btn'
          type='button'
          aria-label='Закрыть'
          onClick={onClickClose}
        >
          <IconClose width={20} height={20} aria-hidden={true} />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    // кладём модальные окна внизу страницы
    document.getElementById('root')!
  )
}

export { Modal };