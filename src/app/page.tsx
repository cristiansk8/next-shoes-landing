import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/app/types"; // Asegúrate de importar el tipo Product
import api from "@/lib/woocommerce";


async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    if (!process.env.urlAPI) {
      throw new Error("La variable de entorno NEXT_PUBLIC_API_URL no está definida");
    }

    const response = await api.get<Product[]>("products", {
      per_page: 10,
      category: categoryId.toString(),
      status: "publish",
    });

    return response.data || [];
  } catch (error) {
    console.error(`Error al obtener productos de la categoría ${categoryId}:`, error);
    return [];
  }
}


export default async function Home() {
  const category1Id = 203; // Reemplaza con el ID real de la primera categoría
  const category2Id = 219; // Reemplaza con el ID real de la segunda categoría
  const category3Id = 211; // Reemplaza con el ID real de la segunda categoría

  const [productsCategory1, productsCategory2, productsCategory3] = await Promise.all([
    getProductsByCategory(category1Id),
    getProductsByCategory(category2Id),
    getProductsByCategory(category3Id),
  ]);

  return (
    <div className="flex flex-col items-center">
      <div id="nike" className="items-center md:items-start">
        <h2 className="text-2xl font-semibold mt-6">Nike SB</h2>
        <ProductCarousel products={productsCategory1} />
      </div>

      <div id="DC" className="items-center md:items-start">
        <h2 className="text-2xl font-semibold mt-6">DC shoes</h2>
        <ProductCarousel products={productsCategory2} />
      </div>

      <div id="vans" className="items-center md:items-start">
        <h2 className="text-2xl font-semibold mt-6">Vans</h2>
        <ProductCarousel products={productsCategory3} />
      </div>
    </div>
  );
}
