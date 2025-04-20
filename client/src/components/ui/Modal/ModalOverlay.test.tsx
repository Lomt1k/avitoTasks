import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ModalOverlay } from './ModalOverlay';

describe('ModalOverlay', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(<ModalOverlay onClickClose={() => {}}>Test</ModalOverlay>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Обрабатывает событие клика', () => {
    const onClickClose = vi.fn();
    const { getByTestId } = render(<ModalOverlay onClickClose={onClickClose}>Test</ModalOverlay>);
    fireEvent.click(getByTestId('modal-bg'));
    expect(onClickClose).toHaveBeenCalled();
  });
});
