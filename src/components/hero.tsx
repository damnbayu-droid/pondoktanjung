'use client';

import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  const scrollToMenu = () => {
    const element = document.querySelector('#menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&h=1080&fit=crop"
          alt="Cafe Background"
          fill
          priority
          className="object-cover"
          style={{ transform: 'scale(1.1)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
              Pondok Tanjung Kotabunan
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-100 font-medium drop-shadow-md">
              Resto Cafe Sederhana dengan Cita Rasa Lokal Terbaik
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Kotabunan, Sulawesi Utara</span>
            </div>
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <span>Buka Setiap Hari</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              size="lg"
              onClick={scrollToMenu}
              className="w-full sm:w-auto text-lg px-8 py-6"
            >
              Lihat Menu
            </Button>
            <Link href="/checkout" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg px-8 py-6"
              >
                Pesan Sekarang
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-8 w-8 text-muted-foreground" />
      </div>
    </section>
  );
}
