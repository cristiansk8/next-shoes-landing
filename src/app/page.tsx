/* import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/app/types"; // Asegúrate de importar el tipo Product */

/* async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3000/api");

  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }

  return res.json();
} */

export default async function Home() {
/*   const products = await getProducts();
 */
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center my-8">Productos Destacados</h1>
      {/* <ProductCarousel products={products} /> */}
    </div>
  );
}