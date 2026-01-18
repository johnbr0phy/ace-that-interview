import { OnboardingPageClient } from './client';

/**
 * Dynamic Route: /[company]/[role]
 *
 * Examples:
 * - /google/software-engineer
 * - /meta/product-manager
 * - /amazon/data-scientist
 */

const companies = ['google', 'meta', 'amazon', 'apple', 'microsoft', 'netflix'];
const roles = ['software-engineer', 'product-manager', 'data-scientist', 'designer', 'engineering-manager'];

export function generateStaticParams() {
  const params: { company: string; role: string }[] = [];

  for (const company of companies) {
    for (const role of roles) {
      params.push({ company, role });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{ company: string; role: string }>;
}

export default async function OnboardingPage({ params }: PageProps) {
  const { company, role } = await params;
  return <OnboardingPageClient company={company} role={role} />;
}
