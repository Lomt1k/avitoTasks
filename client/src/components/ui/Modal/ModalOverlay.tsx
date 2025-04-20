import { FC, ReactNode } from 'react';
import './ModalOverlay.scss';

type ModalOverlayProps = {
  children: ReactNode;
  onClickClose: () => void;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClickClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-overlay__bg" onClick={onClickClose} data-testid="modal-bg" />
      {children}
    </div>
  )
}

export { ModalOverlay };