// Mock data for development without database setup

export const mockProducts = [
  {
    id: 1,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
    name: 'Smartphone X Pro',
    status: 'active' as const,
    price: '999.00',
    stock: 150,
    availableAt: new Date('2024-01-15')
  },
  {
    id: 2,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp',
    name: 'Wireless Earbuds Ultra',
    status: 'active' as const,
    price: '199.00',
    stock: 300,
    availableAt: new Date('2024-01-20')
  },
  {
    id: 3,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/home-iTeNnmKSMnrykOS9IYyJvnLFgap7Vw.webp',
    name: 'Smart Home Hub',
    status: 'active' as const,
    price: '149.00',
    stock: 200,
    availableAt: new Date('2024-02-01')
  },
  {
    id: 4,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp',
    name: '4K Ultra HD Smart TV',
    status: 'active' as const,
    price: '799.00',
    stock: 50,
    availableAt: new Date('2024-02-10')
  },
  {
    id: 5,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
    name: 'Gaming Laptop Pro',
    status: 'active' as const,
    price: '1299.00',
    stock: 75,
    availableAt: new Date('2024-02-15')
  },
  {
    id: 6,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/headset-lYnRnpjDbZkB78lS7nnqEJFYFAUDg6.webp',
    name: 'VR Headset Plus',
    status: 'active' as const,
    price: '349.00',
    stock: 120,
    availableAt: new Date('2024-03-01')
  },
  {
    id: 7,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp',
    name: 'Smartwatch Elite',
    status: 'active' as const,
    price: '249.00',
    stock: 250,
    availableAt: new Date('2024-03-10')
  },
  {
    id: 8,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/speaker-4Zk0Ctx5AvxnwNNTFWVK4Gtpru4YEf.webp',
    name: 'Bluetooth Speaker Max',
    status: 'active' as const,
    price: '99.00',
    stock: 400,
    availableAt: new Date('2024-03-15')
  },
  {
    id: 9,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/charger-GzRr0NSkCj0ZYWkTMvxXGZQu47w9r5.webp',
    name: 'Portable Charger Super',
    status: 'active' as const,
    price: '59.00',
    stock: 500,
    availableAt: new Date('2024-03-20')
  },
  {
    id: 10,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/thermostat-8GnK2LDE3lZAjUVtiBk61RrSuqSTF7.webp',
    name: 'Smart Thermostat Pro',
    status: 'active' as const,
    price: '199.00',
    stock: 175,
    availableAt: new Date('2024-04-01')
  },
  {
    id: 11,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp',
    name: 'Tablet Pro 12',
    status: 'active' as const,
    price: '699.00',
    stock: 100,
    availableAt: new Date('2024-04-05')
  },
  {
    id: 12,
    imageUrl:
      'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp',
    name: 'Ultrabook Air',
    status: 'active' as const,
    price: '1099.00',
    stock: 85,
    availableAt: new Date('2024-04-10')
  }
];

export const mockMenuItems = [
  {
    id: 1,
    label: 'Dashboard',
    href: '#',
    icon: 'Home',
    order: 1,
    isActive: true
  },
  {
    id: 2,
    label: 'Orders',
    href: '#',
    icon: 'ShoppingCart',
    order: 2,
    isActive: true
  },
  {
    id: 3,
    label: 'Products',
    href: '/',
    icon: 'Package',
    order: 3,
    isActive: true
  },
  {
    id: 4,
    label: 'Customers',
    href: '/customers',
    icon: 'Users2',
    order: 4,
    isActive: true
  },
  {
    id: 5,
    label: 'Analytics',
    href: '#',
    icon: 'LineChart',
    order: 5,
    isActive: true
  }
];

// Check if we should use mock data (no database configured)
export function shouldUseMockData(): boolean {
  return !process.env.POSTGRES_URL;
}
