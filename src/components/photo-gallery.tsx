'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    alt: 'Beach View',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    alt: 'Coastal Beauty',
  },
  {
    src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
    alt: 'Sunset Beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
    alt: 'Tropical Paradise',
  },
  {
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800&h=600&fit=crop',
    alt: 'Ocean Waves',
  },
  {
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
    alt: 'Coastline View',
  },
];

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pesisir Pantai Kotabunan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nikmati keindahan pesisir pantai Kotabunan sambil menikmati hidangan
            lezat kami
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={selectedImage || ''}
              alt="Gallery Image"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
