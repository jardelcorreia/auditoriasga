import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));


describe('Login Page', () => {
  it('renders the login form', () => {
    render(<LoginPage />);

    // Check for the main heading
    const heading = screen.getByRole('heading', {
      name: /Acesso ao Sistema de Auditoria/i,
    });
    expect(heading).toBeInTheDocument();

    // Check for the password input field
    const passwordInput = screen.getByPlaceholderText(/Digite a senha compartilhada/i);
    expect(passwordInput).toBeInTheDocument();

    // Check for the submit button
    const submitButton = screen.getByRole('button', { name: /Entrar/i });
    expect(submitButton).toBeInTheDocument();
  });
});
