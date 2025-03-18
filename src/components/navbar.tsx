import React from 'react';
import Image from 'next/image';



const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="logo">
        <a href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100} // Ajusta el tamaño según necesites
            height={50}
          />
        </a>
      </div>

      {/* Enlaces a redes sociales */}
      <div className="social-links flex space-x-4">
        <a
          href="https://www.facebook.com/toryskateshop"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/fb.png"
            alt="Facebook"
            width={24} // Ajusta el tamaño según necesites
            height={24}
          />
        </a>
        <a
          href="https://www.instagram.com/toryskateshop/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/ig.png"
            alt="Instagram"
            width={24} // Ajusta el tamaño según necesites
            height={24}
          />
        </a>
        <a
          href="https://wa.link/6p0b6o"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/wa.png"
            alt="WhatsApp"
            width={24} // Ajusta el tamaño según necesites
            height={24}
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;