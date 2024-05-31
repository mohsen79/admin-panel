import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from '../../app/page';

test('Page', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeDefined();
})