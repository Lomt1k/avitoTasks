import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Select } from './Select';

describe('Select', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(
      <Select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('Устанавливает классы', () => {
    const { getByText } = render(
      <Select className="test-class" error="Error">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </Select>
    );

    expect(getByText('Option 1').parentElement).toHaveClass('select__field test-class');
  });
});
