'use client';

import { ProductCard } from './product-card';
import { ProductModal } from './product-modal';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  highlight: boolean;
}

interface MenuSectionProps {
  title: string;
  products: Product[];
  highlightOnly?: boolean;
}

export function MenuSection({ title, products, highlightOnly = false }: MenuSectionProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetail = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }
  };

  const handleModalAddToCart = (quantity: number) => {
    if (selectedProduct) {
      handleAddToCart(selectedProduct.id, quantity);
    }
  };

  const displayProducts = highlightOnly
    ? products.filter((p) => p.highlight)
    : products;

  if (displayProducts.length === 0) return null;

  return (
    <>
      <section id={highlightOnly ? 'popular' : 'menu'} className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onDetail={() => handleDetail(product)}
                onAddToCart={(qty) => handleAddToCart(product.id, qty)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={selectedProduct}
        onAddToCart={handleModalAddToCart}
      />
    </>
  );
}
