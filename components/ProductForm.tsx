'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Product } from '@/app/page';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  stock: z.coerce.number().int().positive({ message: 'Stock must be a positive integer.' }),
});


interface ProductFormProps {
  product?: Product | null; 
  existingNames: string[]; 
  onSubmit: (values: z.infer<typeof formSchema>) => void; 
  onClose: () => void; 
}

export function ProductForm({ product, existingNames, onSubmit, onClose }: ProductFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema.refine(
        (data) => {
            if (product && product.name === data.name) {
                return true;
            }
            return !existingNames.includes(data.name);
        },
        {
            message: 'Product name must be unique.',
            path: ['name'], 
        }
    )),

    defaultValues: {
      name: product?.name || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl><Input placeholder="e.g., Stylish Black Hat" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (IDR)</FormLabel>
              <FormControl><Input type="number" placeholder="e.g., 250000" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? 'Save Changes' : 'Add Product'}</Button>
        </div>
      </form>
    </Form>
  );
}
