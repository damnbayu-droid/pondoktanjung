'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lock, Package, ShoppingBag, LogOut, ArrowLeft, Edit } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  highlight: boolean;
  createdAt: string;
}

interface Order {
  id: string;
  name: string;
  address: string;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders?includeItems=false'),
      ]);

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      fetchData();
      toast.success('Login berhasil');
    } else {
      toast.error('Password salah');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
    setPassword('');
    toast.success('Logout berhasil');
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchData();
        toast.success('Status pesanan diperbarui');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Gagal memperbarui status');
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          image: editingProduct.image,
          category: editingProduct.category,
          highlight: editingProduct.highlight,
        }),
      });

      if (response.ok) {
        setIsEditDialogOpen(false);
        fetchData();
        toast.success('Produk diperbarui');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Gagal memperbarui produk');
    }
  };

  const deleteProduct = async (productId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
        toast.success('Produk dihapus');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Gagal menghapus produk');
    }
  };

  const seedProducts = async () => {
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });

      if (response.ok) {
        fetchData();
        toast.success('Produk berhasil ditambahkan');
      } else {
        const data = await response.json();
        toast.info(data.message || 'Gagal menambahkan produk');
      }
    } catch (error) {
      console.error('Error seeding products:', error);
      toast.error('Gagal menambahkan produk');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => router.push('/')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalPaket = products.filter((p) => p.category === 'Paket').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const completedOrders = orders.filter((o) => o.status === 'Done').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Paid':
        return 'bg-blue-500';
      case 'Done':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Beranda
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Produk
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Paket
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPaket}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pesanan
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">Pesanan</TabsTrigger>
            <TabsTrigger value="products">Produk</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Pesanan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Pembayaran</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center text-muted-foreground">
                            Belum ada pesanan
                          </TableCell>
                        </TableRow>
                      ) : (
                        orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono">
                              #{order.id.substring(0, 8)}
                            </TableCell>
                            <TableCell>{order.name}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {order.address}
                            </TableCell>
                            <TableCell>
                              Rp {order.total.toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>{order.paymentMethod}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleDateString('id-ID')}
                            </TableCell>
                            <TableCell>
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  updateOrderStatus(order.id, e.target.value)
                                }
                                className="px-2 py-1 rounded border text-sm"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Paid">Paid</option>
                                <option value="Done">Done</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Daftar Produk & Paket</CardTitle>
                <Button onClick={seedProducts} variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Seed Products
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Highlight</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            Belum ada produk
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                              Rp {product.price.toLocaleString('id-ID')}
                            </TableCell>
                            <TableCell>
                              {product.highlight ? '✓' : '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => deleteProduct(product.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Produk / Paket</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama</Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Deskripsi</Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Harga (Rp)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">URL Foto</Label>
                <Input
                  id="edit-image"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      image: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="edit-highlight"
                  checked={editingProduct.highlight}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      highlight: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="edit-highlight">Highlight di Beranda</Label>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
