'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { PlusCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

interface ProductFormData {
  name: string;
  price: string;
  stock: string;
  imageUrl: string;
}

export function AddProductDialog() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    stock: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to add the product
    console.log('Adding product:', formData);
    // Reset form
    setFormData({
      name: '',
      price: '',
      stock: '',
      imageUrl: ''
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {t('addProduct')}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>{t('addProduct')}</SheetTitle>
            <SheetDescription>
              Fill in the product details below to add a new product to your
              inventory.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t('name')}
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Product name"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="price" className="text-sm font-medium">
                {t('price')}
              </label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="stock" className="text-sm font-medium">
                {t('stock')}
              </label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                placeholder="0"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="imageUrl" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {t('cancel')}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button type="submit">{t('save')}</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
