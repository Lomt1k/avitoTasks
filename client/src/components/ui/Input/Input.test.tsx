import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('Рендерится корректно', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test" />);
    expect(getByPlaceholderText('Test')).toBeInTheDocument();
  });

  it('Устанавливает классы', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Test" icon={<span />} error="Error" className="test-class" />);
    expect(getByPlaceholderText('Test').parentElement).toHaveClass('input input--with-icon input--errror test-class');
  });
});
