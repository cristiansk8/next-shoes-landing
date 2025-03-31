"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

interface Banner {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  altText: string;
  linkUrl: string;
}

export default function HeroCarousel({ banners }: { banners: Banner[] }) {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={banners.length > 1}
        className="hero-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href="/" passHref>
              <div className="group cursor-pointer">
                {/* Desktop Image */}
                <div className="hidden md:block relative w-full h-[500px]">
                  <Image
                    src={banner.imageDesktop}
                    alt={banner.altText}
                    fill
                    className="object-cover"
                    priority={banners.indexOf(banner) < 2}
                    sizes="100vw"
                  />
                </div>
                
                {/* Mobile Image */}
                <div className="md:hidden relative w-full h-[300px]">
                  <Image
                    src={banner.imageMobile}
                    alt={banner.altText}
                    fill
                    className="object-cover"
                    priority={banners.indexOf(banner) < 2}
                    sizes="100vw"
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}