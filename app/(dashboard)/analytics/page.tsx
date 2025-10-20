'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const stats = [
    {
      titleKey: 'totalRevenue' as const,
      value: '$45,231.89',
      change: '+20.1%',
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      titleKey: 'totalOrders' as const,
      value: '2,345',
      change: '+15.2%',
      icon: ShoppingCart,
      color: 'text-blue-500'
    },
    {
      titleKey: 'activeCustomers' as const,
      value: '1,234',
      change: '+12.5%',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      titleKey: 'conversionRate' as const,
      value: '3.2%',
      change: '+2.4%',
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          {t('analyticsTitle')}
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.titleKey}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t(stat.titleKey)}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} {t('fromLastMonth')}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('salesOverview')}</CardTitle>
            <CardDescription>{t('salesOverviewDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart visualization would go here
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('topProducts')}</CardTitle>
            <CardDescription>{t('topProductsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Smartphone X Pro', sales: 324 },
                { name: 'Wireless Earbuds Ultra', sales: 287 },
                { name: 'Gaming Laptop Pro', sales: 156 },
                { name: 'Smart Home Hub', sales: 134 },
                { name: 'VR Headset Plus', sales: 98 }
              ].map((product, index) => (
                <div key={product.name} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} {t('unitsSold')}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">#{index + 1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
