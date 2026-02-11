'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, ShoppingCart, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  } | null;
  onAddToCart: (quantity: number) => void;
}

export function ProductModal({
  open,
  onOpenChange,
  product,
  onAddToCart,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  if (!product) return null;

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
    onOpenChange(false);
    setQuantity(1);
  };

  const handleOrderNow = () => {
    onAddToCart(quantity);
    onOpenChange(false);
    setQuantity(1);
    router.push('/checkout');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>
              <p className="text-3xl font-bold text-primary mt-2">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Jumlah</Label>
              <div className="flex items-center space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val > 0) setQuantity(val);
                  }}
                  className="w-20 text-center"
                  min="1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Total Price */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  Rp {(product.price * quantity).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tambah ke Keranjang
              </Button>
              <Button
                onClick={handleOrderNow}
                className="w-full"
                size="lg"
                variant="outline"
              >
                Pesan Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
