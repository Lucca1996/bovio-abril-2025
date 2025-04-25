import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextRequest, NextResponse } from 'next/server';

interface WhereClause {
  [key: string]: {
    equals: number;
  };
}

export async function GET(req: NextRequest) {
  try {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    const { searchParams } = new URL(req.url);
    
    const category = searchParams.get('category');
    const style = searchParams.get('style');
    const where: WhereClause = {};

    if (category) {
      where['category.id'] = {
        equals: parseInt(category, 10),
      };
    }

    if (style) {
      where['style.id'] = {
        equals: parseInt(style, 10),
      };
    }

    const { docs: products } = await payload.find({
      collection: 'products',
      depth: 2,
      where,
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json([], { status: 500 });
  }
}