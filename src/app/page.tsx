'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { MenuSection } from '@/components/menu-section';
import { PhotoGallery } from '@/components/photo-gallery';
import { GoogleReviews } from '@/components/google-reviews';
import { Footer } from '@/components/footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  highlight: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const makananProducts = products.filter((p) => p.category === 'Makanan');
  const minumanProducts = products.filter((p) => p.category === 'Minuman');
  const paketProducts = products.filter((p) => p.category === 'Paket');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <>
            <MenuSection
              title="Menu Favorit"
              products={products}
              highlightOnly={true}
            />
            <MenuSection
              title="Paket Menu"
              products={paketProducts}
            />
            <MenuSection
              title="Menu Makanan"
              products={makananProducts}
            />
            <MenuSection
              title="Menu Minuman"
              products={minumanProducts}
            />
          </>
        )}

        <PhotoGallery />
        <GoogleReviews />
      </main>
      <Footer />
    </div>
  );
}
