"use client"; // Indica que este es un componente del lado del cliente

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Product } from "@/app/types"; // Asegúrate de importar el tipo Product

// Define un tipo para productos con imágenes
type ProductWithImages = Product & {
  images: { src: string }[]; // Asegura que `images` está definida y no es vacía
};

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  // Filtra los productos que tienen al menos una imagen y refina el tipo
  const filteredProducts = products.filter(
    (product): product is ProductWithImages =>
      product.images !== undefined && product.images.length > 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Swiper
        spaceBetween={20} // Espacio entre las cards
        slidesPerView={4} // Muestra 4 cards por vista
        loop={true} // Habilita el desplazamiento infinito
        autoplay={{
          delay: 0, // Sin pausa entre slides
          disableOnInteraction: false, // No se detiene al interactuar
        }}
        speed={5000} // Velocidad de transición (5 segundos)
        freeMode={true} // Habilita el modo libre (movimiento continuo)
        grabCursor={true} // Cambia el cursor al pasar sobre el carrusel
        pagination={{
          clickable: true, // Habilita la paginación
        }}
        navigation={true} // Habilita la navegación con flechas
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          // Configuración responsive
          320: {
            slidesPerView: 1, // 1 card en pantallas pequeñas
          },
          640: {
            slidesPerView: 2, // 2 cards en pantallas medianas
          },
          1024: {
            slidesPerView: 3, // 3 cards en pantallas grandes
          },
          1280: {
            slidesPerView: 4, // 4 cards en pantallas extra grandes
          },
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-72">
                <Image
                  src={product.images[0].src} // TypeScript sabe que `images` está definida
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;