import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('Рендерится корректно', () => {
    const { getByPlaceholderText } = render(<TextArea placeholder="Test" />);
    expect(getByPlaceholderText('Test')).toBeInTheDocument();
  });

  it('Устанавливает классы', () => {
    const { getByPlaceholderText } = render(<TextArea placeholder="Test" error="Error" className="test-class" />);
    expect(getByPlaceholderText('Test').parentElement).toHaveClass('textarea textarea--error test-class');
  });
});
