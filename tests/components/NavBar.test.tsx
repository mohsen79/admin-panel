import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from '../../app/NavBar';
import '@testing-library/jest-dom';

const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
];

test('NavBar', () => {
    render(<NavBar />);

    const allLinks = screen.getAllByRole('link');
    const firstLink = allLinks[0];

    expect(firstLink).toHaveAttribute('href', '/');

    links.forEach(link => expect(screen.getByText(link.label)));
});