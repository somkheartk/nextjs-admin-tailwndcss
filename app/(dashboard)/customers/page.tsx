'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n/language-context';

export default function CustomersPage() {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('customersTitle')}</CardTitle>
        <CardDescription>{t('customersDescription')}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
