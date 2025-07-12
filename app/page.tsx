'use client';

import { useState, useEffect } from 'react';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog"
import { ProductForm } from '@/components/ProductForm';
import { useDebounce } from './hooks/useDebounce';
import { Input } from '@/components/ui/input';
import { ProductSortDropdown } from '@/components/ProductSortDropdown';


export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const initialProducts: Product[] = [
  { id: 1, name: 'Stylish Black Hat', price: 250000, stock: 10, image: 'https://www.meghansfashion.com/uploads/2/1/2/9/21295692/miss-jones-by-stephen-jones-facetime-aw19-black-hat_orig.jpg' },
  { id: 2, name: 'Modern Chair', price: 1500000, stock: 5, image: 'https://staranddaisy.in/wp-content/uploads/2023/08/Makeup-Stool-Iron-Dining-Chair-Business-Negotiation-Chair-Coffee-Chairpink-768x768.jpg' },
  { id: 3, name: 'Minimalist Lamp', price: 750000, stock: 8, image: 'https://m.media-amazon.com/images/I/61H49SeYn3L.__AC_SY445_SX342_QL70_FMwebp_.jpg' },
  { id: 4, name: 'Ceramic Plate', price: 120000, stock: 20, image: 'https://cdn.shopify.com/s/files/1/0278/8642/0047/files/2_600x600.png?v=1730123087' },
];

const formSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
});

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  const [sortOption, setSortOption] = useState('price-asc');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setProducts(initialProducts);
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };
  
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'stock-asc':
        return a.stock - b.stock;
      case 'stock-desc':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...p, ...values } : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...values,
        image: 'https://placehold.co/600x400' 
      };
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false); 
  };


  const handleConfirmDelete = () => {
    if (!productToDelete) return ;
    setProducts(products.filter(p => p.id !== productToDelete.id));
    setIsAlertOpen(false);
    setProductToDelete(null);
  }

  if (isLoading) {
    return <div className="text-center p-10">Loading products...</div>;
  }

  return (
    <main className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        <Button onClick={handleAddProduct}>Add Product</Button>
      </div>
      
      {/* Container for search and sort controls */}
      <div className="flex gap-4 mb-6">
        <Input 
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
        />
        <ProductSortDropdown value={sortOption} onValueChange={setSortOption} />
      </div>

      {sortedAndFilteredProducts.length === 0 ? (
         <div className="text-center p-10">No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <Card key={product.id} className="w-full flex flex-col justify-between">
              <div>
                <CardHeader className="p-0">
                  <img src={product.image} alt={product.name} className="rounded-t-md h-48 w-full object-cover" />
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                  </p>
                  <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                </CardContent>
              </div>
              <CardFooter className="p-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full" onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button variant="destructive" className="w-full" onClick={() => handleDeleteClick(product)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            existingNames={products.map(p => p.name)}
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item 
              <span className="font-semibold"> "{productToDelete?.name}"</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}