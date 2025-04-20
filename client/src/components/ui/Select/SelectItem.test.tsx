import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SelectItem } from './SelectItem';

describe('SelectItem', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(<SelectItem value="1">Test</SelectItem>);
    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Устанавливает классы', () => {
    const { getByText } = render(<SelectItem value="1" className="test-class">Test</SelectItem>);
    expect(getByText('Test')).toHaveClass('select-item test-class');
  });
});
