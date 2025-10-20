'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/lib/i18n/language-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </LanguageProvider>
  );
}
