'use client';

import { useEffect } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { getCompanyConfig } from '@/lib/themes';

interface OnboardingPageClientProps {
  company: string;
  role: string;
}

export function OnboardingPageClient({ company, role }: OnboardingPageClientProps) {
  const companyConfig = getCompanyConfig(company);

  // Apply theme to document
  useEffect(() => {
    if (companyConfig) {
      document.documentElement.setAttribute('data-theme', companyConfig.theme);
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [companyConfig]);

  return <OnboardingFlow company={company} role={role} />;
}
