// components/Nav.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getMenuCategories } from "@/lib/sliderService";

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

  // Obtener categorías
  useEffect(() => {
    getMenuCategories()
    
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
        setCategories([]); // Fallback con array vacío
      })
      .finally(() => setLoading(false));
  }, []);
  // Efectos para responsive y scroll (se mantienen igual)
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
    <nav className={`fixed w-full z-50 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Ritzi"
              width={160}
              height={40}
              className="h-17 w-auto"
              priority
            />
          </Link>

          {/* Menú Desktop */}
          {!loading && (
            <ul className="hidden md:flex space-x-8">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`#${category.slug}`}
                    className="text-gray-800 hover:text-blue-600 transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Botón Hamburguesa */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menú Móvil */}
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <Link href="/" className="text-xl font-bold text-gray-800">
                Ritzi
              </Link>
            </div>
            <ul className="p-4 space-y-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`#${category.slug}`}
                    className="block py-2 text-gray-800 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
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