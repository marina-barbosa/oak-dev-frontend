import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, jest } from '@jest/globals';
import { Header } from '../components/header';
import '@testing-library/jest-dom'

jest.mock('../assets/logo-oakdev.jpeg', () => 'mockedLogoPath');

describe('Componente Header', () => {
  test('renderiza o header com a imagem da logo', () => {
    render(<Header />);

    const logoImg = screen.getByAltText('logo-oak');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'mockedLogoPath');
    expect(logoImg).toHaveClass('w-40');
  });

  test('deve ter aplicadas as classes corretas', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass('shadow-md');
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('justify-center');
    expect(container.firstChild).toHaveClass('items-center');
    // expect(container.firstChild).toHaveClass('shadow-md', 'flex', 'justify-center', 'items-center');
  });
});


