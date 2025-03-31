// components/Nav.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image"; // Importa el componente Image



const menuItems = [
  { id: 1, title: "Nike", url: "#nike" },
  { id: 2, title: "DC", url: "#DC" },
  { id: 3, title: "Vans", url: "#vans" },
];

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Cerrar menú al cambiar tamaño de pantalla (opcional)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efecto para navbar fijo con scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png" // Ruta relativa desde la carpeta public
              alt="Ritzi"
              width={160} // Ajusta según el ancho de tu logo
              height={40} // Ajusta según la altura de tu logo
              className="h-17 w-auto" // Clases opcionales para control adicional
              priority // Opcional: carga prioritariamente el logo
            />
          </Link>

          {/* Menú Desktop (hidden en móvil) */}
          <ul className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="text-gray-800 hover:text-blue-600 transition"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botón Hamburguesa (solo móvil) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menú Móvil (Off-Canvas) */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <Link href="/" className="text-xl font-bold text-gray-800">
                MiSitio
              </Link>
            </div>
            <ul className="p-4 space-y-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}