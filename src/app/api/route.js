import { NextResponse } from 'next/server';

export async function GET() {
  const consumer_key2 = process.env.CONSUMER_KEY;
  const consumer_secret2 = process.env.CONSUMER_SECRET;

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
  } catch {
    // Sin declarar `error` si no lo necesitas
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}