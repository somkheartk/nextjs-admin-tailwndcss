'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n/language-context';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2024-03-15',
    status: 'completed',
    total: 1299.0,
    items: 3
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-03-16',
    status: 'pending',
    total: 799.0,
    items: 2
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    date: '2024-03-17',
    status: 'processing',
    total: 349.0,
    items: 1
  },
  {
    id: 'ORD-004',
    customer: 'Alice Williams',
    date: '2024-03-18',
    status: 'completed',
    total: 1998.0,
    items: 4
  },
  {
    id: 'ORD-005',
    customer: 'Charlie Brown',
    date: '2024-03-19',
    status: 'cancelled',
    total: 199.0,
    items: 1
  }
];

export default function OrdersPage() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('ordersTitle')}</CardTitle>
          <CardDescription>{t('ordersDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('orderId')}</TableHead>
                <TableHead>{t('customer')}</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('items')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('total')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'default'
                          : order.status === 'pending'
                            ? 'secondary'
                            : order.status === 'processing'
                              ? 'outline'
                              : 'destructive'
                      }
                    >
                      {t(order.status as any)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
