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
  onoff: boolean; // Propiedad requerida
  title?: string;
  description?: string;
}

export interface Banner {
  id: string;
  imageDesktop: string;
  imageMobile: string;
  altText: string;
  linkUrl: string;
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
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();

    // Validación de estructura
   

    // Combinación segura con tipado explícito
    const activeSlides = data.data.reduce<ApiSlideResponse[]>((result: ApiSlideResponse[], slide: ApiSlideResponse, index: number) => {
      const debugInfo = data.debug.slider_data_raw[index];
      
      if (debugInfo?.onoff === true) {
        result.push({
          ...slide,
          categoria: debugInfo.categoria,
          onoff: true
        });
      }
      return result;
    }, []);

    console.log('Slides activos:', activeSlides);
    return activeSlides;

  } catch (error) {
    console.error('Error obteniendo slides:', error);
    return [];
  }
}