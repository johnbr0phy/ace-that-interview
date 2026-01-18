'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { OnboardingFlow } from '@/components/OnboardingFlow';
import { getCompanyConfig } from '@/lib/themes';

/**
 * Dynamic Route: /[company]/[role]
 *
 * Examples:
 * - /google/software-engineer
 * - /meta/product-manager
 * - /amazon/data-scientist
 *
 * Applies company theme and renders the onboarding flow.
 */
export default function OnboardingPage() {
  const params = useParams();
  const company = params.company as string;
  const role = params.role as string;

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
