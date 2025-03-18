import React from 'react';
import { Product } from '@/app/types'; // Asegúrate de importar el tipo Product
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={product.images?.[0]?.src || '/placeholder-product.jpg'}
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
  );
};

export default ProductCard;