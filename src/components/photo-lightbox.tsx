'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface PhotoLightboxProps {
    src: string;
    alt: string;
    isOpen: boolean;
    onClose: () => void;
}

export function PhotoLightbox({ src, alt, isOpen, onClose }: PhotoLightboxProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 transition-all duration-300 animate-in fade-in"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[110] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X className="h-6 w-6" />
            </button>

            <div
                className="relative w-full max-w-5xl aspect-square md:aspect-video rounded-lg overflow-hidden animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                />
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
                {alt}
            </div>
        </div>
    );
}
