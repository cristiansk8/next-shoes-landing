import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/app/types"; // Asegúrate de importar el tipo Product
import api from "@/lib/woocommerce";


async function getProducts2(): Promise<Product[]> {
  try {
    const response = await api.get<Product[]>("products", {
      per_page: 10,
      status: "publish",
    });

    return response.data; // Ahora TypeScript sabe que `data` es de tipo `Product[]`
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts2();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center my-8">Productos Destacados</h1>
      <ProductCarousel products={products} />
    </div>
  );
}
