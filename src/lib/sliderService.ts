// Definición de tipos completos
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
    title?: string;
    description?: string;
  }
  
  export interface ApiResponse {
    success: boolean;
    data: ApiSlideResponse[];
    error: string | null;
    debug?: {
      home_id?: string;
      slider_data_raw?: Array<{
        home_slider_img: string;
        home_slider_img_mobile: string;
        url: string;
        title?: string;
      }>;
    };
    count: number;
  }
  
  export async function getHomeSlides(): Promise<ApiSlideResponse[]> {
    try {
      const response = await fetch('https://toryskateshop.com/wp-json/tory/v1/home-slider', {
        next: { revalidate: 3600 } // Cache de 1 hora
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      
      // Validación exhaustiva de la respuesta
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Formato de respuesta inválido');
      }
  
      return data.data.map((slide) => ({
        id: slide.id,
        desktop: {
          url: slide.desktop.url,
          alt: slide.desktop.alt || `Banner ${slide.id}`
        },
        mobile: {
          url: slide.mobile.url,
          alt: slide.mobile.alt || `Banner ${slide.id}`
        },
        link: slide.link,
        title: slide.title,
        description: slide.description
      }));
  
    } catch (error) {
      console.error('Error fetching home slides:', error);
      return [];
    }
  }