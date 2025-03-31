"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

interface HeroBanner {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  altText: string;
  linkUrl: string;
}

interface HeroCarouselProps {
  banners: HeroBanner[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ banners }) => {
  // Función mejorada para manejar las URLs de imágenes
  const getValidImageUrl = (imgPath: string) => {
    try {
      // Si es una URL absoluta válida, la devolvemos
      if (/^https?:\/\//.test(imgPath)) {
        return imgPath;
      }
      
      // Para rutas relativas, eliminamos cualquier slash inicial
      const cleanPath = imgPath.startsWith('/') ? imgPath.slice(1) : imgPath;
      
      // Construimos la URL basada en la ubicación actual
      return new URL(cleanPath, window.location.origin).toString();
    } catch (error) {
      console.error("Error al construir URL de imagen:", error);
      // Fallback a una imagen por defecto o cadena vacía
      return "/default-banner.jpg";
    }
  };

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.linkUrl} passHref>
              <div className="relative w-full h-[300px] md:h-[500px] cursor-pointer">
                {/* Imagen para mobile */}
                <div className="md:hidden w-full h-full">
                  <Image
                    src={getValidImageUrl(banner.imageMobile)}
                    alt={banner.altText || "Banner promocional"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    quality={100}
                    priority
                    className="object-cover hover:opacity-95 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-banner.jpg";
                    }}
                  />
                </div>
                
                {/* Imagen para desktop */}
                <div className="hidden md:block w-full h-full">
                  <Image
                    src={getValidImageUrl(banner.imageDesktop)}
                    alt={banner.altText || "Banner promocional"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    quality={100}
                    priority
                    className="object-cover hover:opacity-95 transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/default-banner.jpg";
                    }}
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;