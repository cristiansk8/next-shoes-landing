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

    if (!response.ok) throw new Error();

    const data: ApiResponse = await response.json();

    // Log para ver toda la estructura de la respuesta de la API
    console.log("Respuesta de la API:", data);

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

    // Log para ver los slides filtrados por "onoff" == true
    console.log("Slides activos:", activeSlides);

    return activeSlides;
  } catch (error) {
    console.error('Error obteniendo slides:', error);
    return [];
  }
}

export async function getActiveCategories(): Promise<Category[]> {
  try {
    // 1. Fetch data from API
    const response = await fetch('https://toryskateshop.com/wp-json/tory/v1/home-slider');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data: ApiResponse = await response.json();

    // 2. Filter active slides with categories
    const activeCategories = data.debug.slider_data_raw
      .filter((item): item is DebugSlideInfo & { categoria: string } => 
        item.onoff === true && 
        typeof item.categoria === 'string' && 
        item.categoria.trim() !== ''
      )
      .map(item => item.categoria.trim());

    // 3. Remove duplicates and format
    const uniqueCategories = [...new Set(activeCategories)];
    
    return uniqueCategories.map((name, index) => ({
      id: index + 1,
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    }));

  } catch (error) {
    console.error('Error getting active categories:', error);
    return [];
  }
}