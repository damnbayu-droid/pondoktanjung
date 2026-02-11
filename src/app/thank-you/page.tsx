'use client';

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { useEffect, useState, useCallback, Suspense } from 'react';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const fetchOrderDetails = useCallback(async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  }, [orderId]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, fetchOrderDetails]);

  const whatsappNumber = '6281245737282';

  let whatsappMessage = 'Halo, saya ingin menanyakan pesanan saya.';
  if (orderDetails) {
    if (orderDetails.paymentMethod === 'cod') {
      whatsappMessage = `Halo, saya telah membuat pesanan #${orderDetails.id.substring(0, 8)} dengan metode COD. Mohon segera diproses ya!`;
    } else {
      whatsappMessage = `Halo, saya sudah melakukan pembayaran untuk pesanan #${orderDetails.id.substring(0, 8)}. Berikut bukti pembayarannya:`;
    }
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <Card className="text-center shadow-xl border-primary/10">
      <CardHeader>
        <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-14 h-14 text-green-600" />
        </div>
        <CardTitle className="text-4xl font-black text-primary">Pesanan Diterima!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <p className="text-xl font-medium text-foreground">
            Terima kasih telah memesan di Pondok Tanjung.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Pesanan Anda segera kami siapkan. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi pengantaran.
          </p>
        </div>

        {orderDetails?.paymentMethod !== 'cod' && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 text-left shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <p className="font-bold text-yellow-900 text-lg uppercase tracking-tight">
                Penting: Konfirmasi Bayar
              </p>
            </div>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Silakan kirim bukti transfer melalui tombol WhatsApp di bawah agar pesanan Anda masuk ke antrean <span className="font-bold underline">Prioritas</span> dan segera kami kirim.
            </p>
          </div>
        )}

        {orderDetails && (
          <div className="bg-muted/50 p-6 rounded-2xl text-left space-y-4 border">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Detail Pesanan:</p>
            <div className="text-sm space-y-3">
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-mono font-bold">#{orderDetails.id.substring(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-muted-foreground">Pemesan</span>
                <span className="font-bold">{orderDetails.name}</span>
              </div>
              <div className="flex justify-between border-b border-dashed pb-2">
                <span className="text-muted-foreground">Metode Bayar</span>
                <span className="font-bold text-primary uppercase">
                  {orderDetails.paymentMethod === 'transfer'
                    ? 'Bank Transfer'
                    : orderDetails.paymentMethod === 'qris'
                      ? 'QRIS'
                      : 'COD (Bayar di Tempat)'}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-lg font-bold">Total Pembayaran</span>
                <span className="text-xl font-black text-primary">
                  Rp {orderDetails.total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-4">
          <Button asChild size="lg" className="w-full h-16 text-lg font-bold shadow-lg">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              {orderDetails?.paymentMethod === 'cod' ? 'Hubungi Kami (WhatsApp)' : 'Kirim Bukti Pembayaran'}
              <ArrowRight className="ml-3 h-6 w-6" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            className="w-full text-muted-foreground hover:text-primary transition-colors"
            onClick={() => (window.location.href = '/')}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-2xl">
          <Suspense fallback={
            <div className="flex items-center justify-center p-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }>
            <ThankYouContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
