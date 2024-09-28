import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import { Footer } from '../components/footer';
import '@testing-library/jest-dom'

describe('Component Footer', () => {
  test('deve renderizar o copyright corretamente', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Marina Barbosa`, 'i'));
    expect(copyrightText).toBeInTheDocument();
  });

  test('deve renderizar os links de redes sociais corretos', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/marina-barbosa');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/marina-barbosa-exp/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');

    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/13996697841');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
  });



  test('deve renderizar os ícones de redes sociais corretamente', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });

    const githubIcon = githubLink.querySelector('svg');
    const linkedinIcon = linkedinLink.querySelector('svg');
    const whatsappIcon = whatsappLink.querySelector('svg');

    expect(githubIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(whatsappIcon).toBeInTheDocument();

    expect(githubIcon).toHaveClass('tabler-icon-brand-github');
    expect(linkedinIcon).toHaveClass('tabler-icon-brand-linkedin');
    expect(whatsappIcon).toHaveClass('tabler-icon-brand-whatsapp');

    expect(githubIcon).toHaveAttribute('width', '24');
    expect(githubIcon).toHaveAttribute('height', '24');

    expect(linkedinIcon).toHaveAttribute('width', '24');
    expect(linkedinIcon).toHaveAttribute('height', '24');

    expect(whatsappIcon).toHaveAttribute('width', '24');
    expect(whatsappIcon).toHaveAttribute('height', '24');
  });



  test('deve aplicar as classes de estilo corretamente', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-800', 'text-white', 'py-4', 'font-openSans');

    const container = footer.querySelector('.container');
    expect(container).toHaveClass('mx-auto', 'text-center');

    const paragraph = footer.querySelector('p');
    expect(paragraph).toHaveClass('text-sm');

    const iconContainer = footer.querySelector('.flex');
    expect(iconContainer).toHaveClass('justify-center', 'space-x-4', 'mt-2');
  });
});