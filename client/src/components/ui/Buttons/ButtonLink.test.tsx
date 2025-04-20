import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ButtonLink } from './ButtonLink';
import { BrowserRouter } from 'react-router';

describe('ButtonLink', () => {
  it('Рендерится корректно', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ButtonLink to="/test">Test</ButtonLink>
      </BrowserRouter>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });

  it('Устанавливает классы', () => {
    const { getByText } = render(
      <BrowserRouter>
        <ButtonLink to="/test" secondary>Test</ButtonLink>
      </BrowserRouter>
    );

    expect(getByText('Test')).toHaveClass('button button--secondary');
  });
});
