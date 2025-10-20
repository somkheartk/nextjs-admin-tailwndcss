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
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/language-context';

// Mock users for role management
const mockUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active'
  },
  {
    id: 2,
    email: 'manager@example.com',
    name: 'Manager User',
    role: 'manager',
    status: 'active'
  },
  {
    id: 3,
    email: 'user@example.com',
    name: 'Regular User',
    role: 'user',
    status: 'active'
  }
];

export default function SettingsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{t('roleManagement')}</CardTitle>
          <CardDescription>{t('roleManagementDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead className="text-right">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === 'admin'
                          ? 'default'
                          : user.role === 'manager'
                            ? 'secondary'
                            : 'outline'
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      {t('edit')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('rolePermissions')}</CardTitle>
          <CardDescription>{t('rolePermissionsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                {t('adminRole')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('adminRoleDescription')}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-700 dark:text-green-400">
                {t('managerRole')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('managerRoleDescription')}
              </p>
            </div>
            <div className="border-l-4 border-gray-500 pl-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-400">
                {t('userRole')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('userRoleDescription')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
