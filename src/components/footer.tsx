'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-16 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-xl tracking-tight">
              Pondok Tanjung
            </h3>
            <p className="text-sm leading-relaxed">
              Resto Cafe Sederhana dengan Cita Rasa Lokal Terbaik di Kotabunan,
              Sulawesi Utara. Tempat nyantai dengan view pantai yang mempesona.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://www.facebook.com/share/1C4GNTMmrZ/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-background hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm border"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://indonesianvisas.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-background hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:text-white transition-all duration-300 shadow-sm border"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-lg mb-4">
              Hubungi Kami
            </h3>
            <div className="space-y-4">
              <a
                href="https://maps.app.goo.gl/VNJhGK8PUEYS5VCq8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 text-sm hover:text-primary transition-colors group"
              >
                <MapPin className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span>
                  Jl. Trans Sulawesi Utara, Link. Selatan, Kotabunan
                </span>
              </a>
              <a
                href="https://wa.me/6281245737282"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm hover:text-primary transition-colors group"
              >
                <Phone className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                <span>+62 812 4573 7282</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-lg mb-4">Tautan</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <Link
                href="#menu"
                className="hover:text-primary transition-colors px-0"
              >
                Menu
              </Link>
              <Link
                href="#popular"
                className="hover:text-primary transition-colors px-0"
              >
                Favorit
              </Link>
              <Link
                href="#gallery"
                className="hover:text-primary transition-colors px-0"
              >
                Galeri
              </Link>
              <Link
                href="#reviews"
                className="hover:text-primary transition-colors px-0"
              >
                Ulasan
              </Link>
            </div>
          </div>

          {/* Credit */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-lg mb-4">Credit</h3>
            <div className="bg-background rounded-2xl p-4 border shadow-sm space-y-3">
              <p className="text-xs leading-relaxed text-muted-foreground">
                UMKM Support <span className="text-primary font-bold">"kotabunan.shop"</span>
              </p>
              <p className="text-xs leading-relaxed font-medium">
                Buat website anda agar berjualan jadi mudah. Let's Grow Together!
              </p>
              <Link
                href="https://kotabunan.shop"
                target="_blank"
                className="inline-block text-[10px] font-bold text-primary hover:underline"
              >
                Kunjungi kotabunan.shop →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm">
          <p className="mb-6 font-medium">
            © {currentYear} Pondok Tanjung Kotabunan. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-muted-foreground/60 uppercase tracking-widest">
            <Link
              href="https://indodesign.website"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              indodesign.website
            </Link>
            <span className="opacity-20">|</span>
            <Link
              href="https://kotabunan.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              kotabunan.shop
            </Link>
            <span className="opacity-20">|</span>
            <Link
              href="https://indesianvisas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              indonesianvisas.com
            </Link>
            <span className="opacity-20">|</span>
            <Link
              href="https://balihelp.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              balihelp.id
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
