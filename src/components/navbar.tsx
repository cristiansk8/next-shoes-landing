import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Importa el componente Link

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="logo">
        <Link href="/"> {/* Usa Link en lugar de <a> */}
          <a> {/* El <a> debe estar dentro de Link */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={100} // Ajusta el tamaño según necesites
              height={50}
            />
          </a>
        </Link>
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