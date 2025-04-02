import ProductCarousel from "@/components/ProductCarousel";
import { Product } from "@/app/types";
import api from "@/lib/woocommerce";
import HeroCarousel from "@/components/HeroCarousel";
import { getHomeSlides } from "@/lib/sliderService";

async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
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
  const [slides, productsCategory1, productsCategory2, productsCategory3, productsCategory4,productsCategory5 ] = await Promise.all([
    getHomeSlides(),
    getProductsByCategory(203), // Nike SB
    getProductsByCategory(219), // DC shoes
    getProductsByCategory(211), // Vans
    getProductsByCategory(204), // Adidas
    getProductsByCategory(220), // Runnign
  ]);

  // Verificación en consola de los datos recibidos
  console.log('Slides recibidos:', slides);

  return (
    <div className="pt-26">
      {/* Hero Slider */}
      {slides.length > 0 ? (
        <HeroCarousel banners={slides.map(slide => ({
          id: slide.id,
          imageDesktop: slide.desktop.url,
          imageMobile: slide.mobile.url,
          altText: slide.desktop.alt,
          linkUrl: slide.link
        }))} />
      ) : (
        <div className="w-full h-[300px] md:h-[500px] bg-gray-100 flex items-center justify-center">
          <p>No hay banners disponibles</p>
        </div>
      )}

      {/* Nike Products */}
      <div id="nike" className="">
        <h2 className="text-center font-bold text-3xl pt-8">Nike SB</h2>
        <ProductCarousel products={productsCategory1} />
      </div>

      {/* DC Products */}
      <div id="DC" className="">
        <h2 className="text-center font-bold text-3xl pt-8">DC shoes</h2>
        <ProductCarousel products={productsCategory2} />
      </div>

      {/* Vans Products */}
      <div id="vans" className="">
        <h2 className="text-center font-bold text-3xl pt-8">Vans</h2>
        <ProductCarousel products={productsCategory3} />
      </div>

      {/* Adidas Products */}
      <div id="vans" className="">
        <h2 className="text-center font-bold text-3xl pt-8">Adidas</h2>
        <ProductCarousel products={productsCategory4} />
      </div>
      
      {/* Adidas Products */}
      <div id="vans" className="">
        <h2 className="text-center font-bold text-3xl pt-8">Running</h2>
        <ProductCarousel products={productsCategory5} />
      </div>

    </div>
  );
}