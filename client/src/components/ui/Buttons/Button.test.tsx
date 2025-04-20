import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(<Button>Test</Button>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Обрабатывает событие клика', () => {
    const onClick = vi.fn();
    const { getByText } = render(<Button onClick={onClick}>Test</Button>);
    fireEvent.click(getByText('Test'));
    expect(onClick).toHaveBeenCalled();
  });

  it('Устанавливает тип кнопки', () => {
    const { getByText } = render(<Button submit>Test</Button>);
    expect(getByText('Test')).toHaveAttribute('type', 'submit');
  });

  it('Устанавливает классы', () => {
    const { getByText } = render(<Button secondary className="test-class">Test</Button>);
    expect(getByText('Test')).toHaveClass('button button--secondary test-class');
  });
});
