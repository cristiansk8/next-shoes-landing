import { NextResponse } from 'next/server';

export async function GET() {
  const consumer_key2 = 'ck_bcada2f49327a0cf50a1ea0bf198b6cd27797d7f';
  const consumer_secret2 = 'cs_7593f05559f1438f7611bf3d9a522798777b6359';

  try {
    const response = await fetch('https://toryskateshop.com/wp-json/wc/v3/products', {
      headers: {
        Authorization: `Basic ${Buffer.from(`${consumer_key2}:${consumer_secret2}`).toString('base64')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}