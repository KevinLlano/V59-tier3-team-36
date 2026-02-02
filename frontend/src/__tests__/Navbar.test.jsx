import { screen } from '@testing-library/react';
import { renderWithClient } from './utils';
import Navbar from '../components/Navbar';


describe('Navbar', () => {
  it('renders Home navigation link', () => {
    renderWithClient(<Navbar />);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toBeInTheDocument();
  });

  it('Home link points to root path', () => {
    renderWithClient(<Navbar />);
    const homeLink = screen.getByText(/home/i);
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders Roles navigation link', () => {
    renderWithClient(<Navbar />);
    const rolesLink = screen.getByText(/roles/i);
    expect(rolesLink).toBeInTheDocument();
  });

  it('Roles link points to /roles path', () => {
    renderWithClient(<Navbar />);
    const rolesLink = screen.getByText(/roles/i);
    expect(rolesLink.closest('a')).toHaveAttribute('href', '/roles');
  });
});
