"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getActiveCategories } from "@/lib/sliderService";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const socialLinks = {
    facebook: "https://facebook.com/tuperfil",
    instagram: "https://www.instagram.com/ritzy_sneakers/",
  };

  useEffect(() => {
    getActiveCategories()
      .then(setCategories)
      .catch((error) => {
        console.error("Error cargando categorías:", error);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg py-2" : "bg-white py-4"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo más grande */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Ritzi" 
              width={200} 
              height={50} 
              className={`transition-all duration-300 ${isScrolled ? "h-12 w-auto" : "h-14 w-auto"}`} 
              priority 
            />
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {!loading && (
              <ul className="flex space-x-10">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      href={`#${category.slug}`} 
                      className="text-gray-800 hover:text-blue-600 transition-colors duration-200 font-medium text-lg"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* Iconos redes sociales - más grandes y mejor espaciados */}
            <div className="flex space-x-6 ml-10">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="group">
                <svg className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.44V12h2V9.8c0-2.5 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" />
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="group">
                <svg className="w-7 h-7 text-gray-600 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.37 3.89 3.88 2.34 7.14 2.19 8.41 2.13 8.79 2.12 12 2.12zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Botón menú móvil */}
          <button
            className="md:hidden focus:outline-none text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil mejorado */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200">
            <Link href="/" className="text-3xl font-bold text-gray-800">Ritzi</Link>
          </div>
          
          <ul className="p-6 space-y-5">
            {categories.map((category) => (
              <li key={category.id}>
                <Link 
                  href={`#${category.slug}`} 
                  className="block py-3 text-xl text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Redes sociales en móvil */}
          <div className="absolute bottom-6 left-6 flex space-x-6">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <svg className="w-8 h-8 text-gray-600 hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99H8.44V12h2V9.8c0-2.5 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.13 22 16.99 22 12z" />
              </svg>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <svg className="w-8 h-8 text-gray-600 hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.37 3.89 3.88 2.34 7.14 2.19 8.41 2.13 8.79 2.12 12 2.12zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}