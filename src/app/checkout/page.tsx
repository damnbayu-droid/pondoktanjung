'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ArrowLeft, ShoppingBag, AlertCircle, PlusCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, addItem } =
    useCartStore();
  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    note: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setAvailableProducts(data);
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuickAdd = (productId: string) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (product) {
      addItem({
        id: Math.random().toString(36).substring(7),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success(`${product.name} ditambahkan ke pesanan`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.paymentMethod) {
      toast.error('Mohon lengkapi semua field yang diperlukan');
      return;
    }

    if (items.length === 0) {
      toast.error('Mohon pilih minimal satu menu');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        name: formData.name,
        address: formData.address,
        note: formData.note,
        paymentMethod: formData.paymentMethod,
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      clearCart();
      router.push(`/thank-you?orderId=${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Gagal membuat pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali Belanja
            </Button>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Form Pesanan</h1>
              <Badge variant="outline" className="px-4 py-1 text-sm">
                Checkout Style
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-primary/20 shadow-lg">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    Pilih Menu
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <Label>Tambahkan Menu ke Pesanan</Label>
                    <Select onValueChange={handleQuickAdd} disabled={productsLoading}>
                      <SelectTrigger className="w-full h-12">
                        <SelectValue placeholder={productsLoading ? "Sedang mengambil menu..." : "Klik untuk memilih menu..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProducts.length === 0 && !productsLoading ? (
                          <div className="p-4 text-center text-sm text-destructive font-medium">
                            Menu tidak ditemukan. Pastikan database sudah di-seed.
                          </div>
                        ) : (
                          availableProducts.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              <div className="flex justify-between items-center w-full gap-4">
                                <span>{product.name}</span>
                                <span className="text-primary font-bold">
                                  Rp {product.price.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {availableProducts.length === 0 && !productsLoading && (
                      <p className="text-[10px] text-destructive leading-tight italic">
                        * Jika pilihan menu tidak muncul, hubungi tim IT untuk melakukan setup database.
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground pt-1">
                      * Pilih menu favorit anda dari daftar di atas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Informasi Pemesan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Contoh: Budi Santoso"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat Pengiriman *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat lengkap pengiriman"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="note">Catatan Pesanan</Label>
                    <Textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Contoh: Sambal dipisah, dll"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Metode Pembayaran *</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, paymentMethod: value })
                    }
                    required
                  >
                    <SelectTrigger className="h-12 border-primary/20">
                      <SelectValue placeholder="--- Pilih Metode Pembayaran ---" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transfer">Bank Transfer (Manual)</SelectItem>
                      <SelectItem value="qris">QRIS (Otomatis)</SelectItem>
                      <SelectItem value="cod">COD (Bayar di Tempat)</SelectItem>
                    </SelectContent>
                  </Select>

                  {(formData.paymentMethod === 'transfer' || formData.paymentMethod === 'qris') && (
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800 text-xs font-bold">Informasi Prioritas</AlertTitle>
                      <AlertDescription className="text-blue-700 text-[11px] leading-tight">
                        Bayar dengan Transfer Bank atau QRIS untuk Proses & Pengiriman Lebih Cepat / Prioritas.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold shadow-xl" disabled={loading}>
                {loading ? 'Sedang Memproses...' : 'Konfirmasi Pesanan Sekarang'}
              </Button>
            </form>

            {/* Right Column: Summary */}
            <div className="space-y-6">
              <Card className="shadow-lg sticky top-24">
                <CardHeader className="border-b">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                      <div className="py-12 text-center text-muted-foreground">
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PlusCircle className="h-8 w-8 opacity-20" />
                        </div>
                        <p>Belum ada menu yang dipilih.</p>
                        <p className="text-sm">Silakan pilih menu di kolom sebelah kiri.</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-xs text-muted-foreground">
                                Rp {item.price.toLocaleString('id-ID')}
                              </p>
                              <div className="flex items-center border rounded-md">
                                <button
                                  type="button"
                                  className="px-2 py-0.5 hover:bg-muted text-xs"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="px-2 py-0.5 text-xs font-medium border-x">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="px-2 py-0.5 hover:bg-muted text-xs"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-sm whitespace-nowrap">
                              Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-6 bg-muted/30 rounded-b-lg">
                    <Separator className="mb-4" />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Subtotal Pesanan</span>
                        <span className="font-medium">Rp {totalPrice.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Biaya Layanan</span>
                        <span className="text-green-600 font-medium">Gratis</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-xl font-black">
                        <span>TOTAL AKHIR</span>
                        <span className="text-primary">
                          Rp {totalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 shadow-sm">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm text-yellow-800">Butuh Bantuan?</h5>
                    <p className="text-xs text-yellow-700 mt-1 leading-relaxed">
                      Jika anda mengalami kesulitan saat melakukan pemesanan, hubungi kami melalui WhatsApp di <span className="font-bold">+62 812-4573-7282</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
