// src/app/types/index.ts
export type Product = {
  id: number;
  name: string;
  price: string;
  images?: { id: number; src: string; alt: string }[];
};