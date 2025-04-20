import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('Рендерится корректно', () => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
    const { getByText } = render(<Modal onClickClose={() => {}}>Test</Modal>, { container });
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Обрабатывает событие клика', () => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
    const onClickClose = vi.fn();
    const { getByRole } = render(<Modal onClickClose={onClickClose}>Test</Modal>, { container });
    fireEvent.click(getByRole('button'));
    expect(onClickClose).toHaveBeenCalled();
  });
});
