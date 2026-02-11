'use client';

import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

export function GoogleReviews() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const reviews = [
    {
      name: 'Bayu Alfian',
      rating: 5,
      comment: 'Tempat nongkrong paling asik di Kotabunan! View pantainya juara, apalagi kalau sore bisa lihat sunset dengan latar dua pulau di tengah laut. Kopi dan makanannya top bgt!',
    },
    {
      name: 'Siti Nurhaliza',
      rating: 5,
      comment: 'Lalapan ayamnya bener-bener meresap bumbunya. Suasana outdoor dengan payung-payung di pinggir pantai bikin betah berlama-lama. Sangat direkomendasikan!',
    },
    {
      name: 'Rahmat Hidayat',
      rating: 5,
      comment: 'Cafe dengan pemandangan terbaik di Boltim. Gak nyangka ada tempat sekeren ini di Kotabunan. Bersih, nyaman, dan harganya sangat bersahabat.',
    },
    {
      name: 'Dewi Saputri',
      rating: 5,
      comment: 'Pondok Tanjung emang gak ada duanya. Paket hematnya bener-bener mengenyangkan. View dua pulaunya bikin feed Instagram jadi makin cakep!',
    },
    {
      name: 'Andi Pratama',
      rating: 5,
      comment: 'Pelayanannya ramah banget. Cocok buat gathering atau sekedar nyantai bareng temen. Outdoor area-nya cozy abis dengan payung-payung cantiknya.',
    },
    {
      name: 'Linda Wijaya',
      rating: 5,
      comment: 'Jus mangganya seger banget, pas banget diminum sambil nikmatin angin sepoi-sepoi pantai. Salah satu permata tersembunyi di Sulawesi Utara.',
    },
    {
      name: 'Bambang Kusuma',
      rating: 5,
      comment: 'Sering kesini bareng keluarga. Anak-anak suka karena tempatnya luas dan langsung menghadap laut. Pulau di depannya eksotis banget!',
    },
  ];

  return (
    <section id="reviews" className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-primary">
              Apa Kata Mereka?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nikmati suasana <span className="text-primary font-semibold">Outdoor Cafe</span> terbaik di Kotabunan, Boltim.
              Bersantai di bawah payung cantik pinggir pantai dengan pemandangan langsung ke <span className="text-primary font-semibold">dua pulau eksotis</span> yang mempesona.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 bg-background p-4 rounded-2xl shadow-sm border">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
              </div>
              <div className="pl-2">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs font-medium text-muted-foreground">4.9/5 dari 100+ Ulasan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_400px] pl-4 mb-4"
              >
                <div className="bg-background h-full p-8 rounded-3xl shadow-sm border hover:shadow-md transition-all duration-300 group">
                  <Quote className="h-10 w-10 text-primary/10 mb-4 group-hover:text-primary/20 transition-colors" />
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-8 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">Local Guide • Google Maps</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="max-w-5xl mx-auto my-16">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-background">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.472805636658!2d124.1234!3d0.7890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwNDcnMjAuNCJOIDEyNMKwMDcnMjQuMiJF!5e0!3m2!1sid!2sid!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 py-6 h-auto text-lg bg-[#4285F4] hover:bg-[#3367D6] shadow-lg shadow-blue-500/20"
          >
            <a
              href="https://g.page/r/VNJhGK8PUEYS5VCq8/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-3 h-6 w-6" />
              Tulis Ulasan di Google Maps
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
