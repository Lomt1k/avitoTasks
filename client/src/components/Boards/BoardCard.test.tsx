import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BoardCard } from './BoardCard';
import { Board } from '../../api/Board';
import { BrowserRouter } from 'react-router';

const board: Board = {
  id: 1,
  name: 'Board',
  description: 'Description',
  taskCount: 5,
};

describe('BoardCard', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(
      <BrowserRouter>
        <BoardCard board={board} />
      </BrowserRouter>
    );

    expect(getByText('Board')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
    expect(getByText('Перейти к доске')).toBeInTheDocument();
  });

  it('Снапшот', () => {
    const { container } = render(
      <BrowserRouter>
        <BoardCard board={board} />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
