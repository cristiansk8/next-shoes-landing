"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Banner {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  altText: string;
  linkUrl: string;
}

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !banners || banners.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-gray-100 flex items-center justify-center">
        <p>No hay banners disponibles</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        loop={true}
        loopPreventsSliding={false}
        watchSlidesProgress={true}
        centerInsufficientSlides={true}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={`${banner.id}-${index}`}>
            <Link href={banner.linkUrl} passHref legacyBehavior>
              <a className="block w-full h-full">
                {/* Desktop Image (hidden on mobile) */}
                <div className="hidden md:block relative w-full h-[500px]">
                  <Image
                    src={banner.imageDesktop}
                    alt={banner.altText}
                    fill
                    className="object-cover"
                    priority={index < 2}
                    quality={90}
                    sizes="(max-width: 1920px) 100vw, 50vw"
                  />
                </div>

                {/* Mobile Image (hidden on desktop) */}
                <div className="md:hidden relative w-full h-[300px]">
                  <Image
                    src={banner.imageMobile}
                    alt={banner.altText}
                    fill
                    className="object-cover"
                    priority={index < 2}
                    quality={85}
                    sizes="100vw"
                  />
                </div>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Estilos personalizados para la paginación */}
      <style jsx global>{`
        .hero-swiper {
          --swiper-pagination-bullet-size: 10px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
          --swiper-pagination-bullet-inactive-color: #fff;
          --swiper-pagination-bullet-inactive-opacity: 0.4;
        }
        .swiper-pagination-bullet {
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}