import { IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp } from '@tabler/icons-react';
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 font-openSans">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Marina Barbosa.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/marina-barbosa" target="_blank" aria-label="Github" className="hover:text-gray-400">
            <IconBrandGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/marina-barbosa-exp/" target="_blank" aria-label="Linkedin" className="hover:text-gray-400">
            <IconBrandLinkedin size={24} />
          </a>
          <a href="https://wa.me/13996697841" target="_blank" aria-label="Whatsapp" className="hover:text-gray-400">
            <IconBrandWhatsapp size={24} />
          </a>
        </div>
      </div>
    </footer>
  )
}