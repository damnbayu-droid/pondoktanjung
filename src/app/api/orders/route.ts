import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeItems = searchParams.get('includeItems') === 'true';

    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: includeItems ? {
        items: {
          include: {
            product: true,
          },
        },
      } : undefined,
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, note, paymentMethod, items } = body;

    if (!name || !address || !paymentMethod || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate total
    const total = items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Create order with items
    const order = await db.order.create({
      data: {
        name,
        address,
        note,
        paymentMethod,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
