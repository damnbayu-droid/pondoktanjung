'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  const navLinks = [
    { href: '#menu', label: 'Menu' },
    { href: '#popular', label: 'Favorit' },
    { href: '#gallery', label: 'Galeri' },
    { href: '#reviews', label: 'Ulasan' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">Pondok Tanjung</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <Link href="/checkout">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Contact Button */}
            <Link href="https://wa.me/6281245737282" target="_blank">
              <Button>
                <Phone className="mr-2 h-4 w-4" />
                Hubungi Kami
              </Button>
            </Link>

            {/* Mobile Menu */}
            {isMobile && (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="text-left text-lg font-medium transition-colors hover:text-primary py-2"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
