export interface Banner {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  altText: string;
  linkUrl: string;
}
// lib/sliderService.ts
export interface SlideImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ApiSlideResponse {
  id: string;
  desktop: SlideImage;
  mobile: SlideImage;
  link: string;
  categoria?: string;
  onoff: boolean;
  title?: string;
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface DebugSlideInfo {
  home_slider_img: string;
  home_slider_img_mobile: string;
  url: string;
  categoria?: string;
  onoff: boolean;
}

interface ApiResponse {
  success: boolean;
  data: ApiSlideResponse[];
  error: null | string;
  debug: {
    slider_data_raw: DebugSlideInfo[];
  };
  count: number;
}

export async function getHomeSlides(): Promise<ApiSlideResponse[]> {
  try {
    const response = await fetch('https://toryskateshop.com/wp-json/tory/v1/home-slider');

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: ApiResponse = await response.json();

    const activeSlides = data.data.reduce<ApiSlideResponse[]>((result, slide, index) => {
      const debugInfo = data.debug.slider_data_raw[index];

      if (debugInfo?.onoff === true) {
        result.push({
          ...slide,
          categoria: debugInfo.categoria,
          onoff: true,
        });
      }
      return result;
    }, []);

    return activeSlides;
  } catch (error) {
    console.error('Error obteniendo slides:', error);
    return [];
  }
}

export async function getMenuCategories(): Promise<Category[]> {
  try {
    const slides = await getHomeSlides();

    const uniqueCategories = Array.from(
      new Set(
        slides
          .filter((slide) => slide.onoff && slide.categoria?.trim())
          .map((slide) => slide.categoria!.trim())
      )
    );

    return uniqueCategories.map((name, index) => ({
      id: index + 1,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
    }));
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return [];
  }
}
