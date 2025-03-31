import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/app/types"; // Asegúrate de importar el tipo Product
import api from "@/lib/woocommerce";
import HeroCarousel from "@/components/HeroCarousel";


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
  const banners = [
    {
      id: "1",
      imageDesktop: "https://toryskateshop.com/wp-content/uploads/2024/12/banner-web-ishod.jpg",
      imageMobile: "https://toryskateshop.com/wp-content/uploads/2024/12/banner-web-mobile-ishod.jpg",
      altText: "Oferta especial",
      linkUrl: "/#nike",
    },
    {
      id: "2",
      imageDesktop: "https://toryskateshop.com/wp-content/uploads/2024/02/banner-web-1.jpg",
      imageMobile: "https://toryskateshop.com/wp-content/uploads/2024/02/2-28-20DCLynxBlog1_1024x1024.webp",
      altText: "Nueva colección",
      linkUrl: "/#DC",
    },
  ];

  const category1Id = 203; // Reemplaza con el ID real de la primera categoría
  const category2Id = 219; // Reemplaza con el ID real de la segunda categoría
  const category3Id = 211; // Reemplaza con el ID real de la segunda categoría

  const [productsCategory1, productsCategory2, productsCategory3] = await Promise.all([
    getProductsByCategory(category1Id),
    getProductsByCategory(category2Id),
    getProductsByCategory(category3Id),
  ]);

  return (
    <div className="">
      <HeroCarousel banners={banners} />
      <div id="nike" className="">
        <h2 className="">Nike SB</h2>
        <ProductCarousel products={productsCategory1} />
      </div>

      <div id="DC" className="">
        <h2 className="">DC shoes</h2>
        <ProductCarousel products={productsCategory2} />
      </div>

      <div id="vans" className="">
        <h2 className="">Vans</h2>
        <ProductCarousel products={productsCategory3} />
      </div>
    </div>
  );
}