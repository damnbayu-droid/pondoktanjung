'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Eye, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { PhotoLightbox } from './photo-lightbox';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onDetail: () => void;
  onAddToCart: (quantity: number) => void;
}

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  onDetail,
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(1);
  };

  return (
    <>
      <Card
        className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative aspect-square overflow-hidden bg-muted cursor-zoom-in"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Maximize2 className="text-white h-8 w-8 drop-shadow-lg" />
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          <p className="text-lg font-bold text-primary">
            Rp {price.toLocaleString('id-ID')}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onDetail}
          >
            <Eye className="h-4 w-4 mr-2" />
            Detail
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah
          </Button>
        </CardFooter>
      </Card>

      <PhotoLightbox
        src={image}
        alt={name}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
