export interface ProductImage {
  src: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  images?: ProductImage[]; // Images es opcional
  // ... otras propiedades
}

// Tipo para productos con imágenes garantizadas
export type ProductWithImages = Omit<Product, 'images'> & {
  images: ProductImage[]; // Images ahora es obligatorio
};