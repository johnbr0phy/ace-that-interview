export type CompanyTheme = 'google' | 'meta' | 'amazon' | 'apple' | 'microsoft' | 'netflix';

export interface CompanyConfig {
  name: string;
  displayName: string;
  theme: CompanyTheme;
  tagline: string;
  logo?: string;
}

export const companies: Record<string, CompanyConfig> = {
  google: {
    name: 'google',
    displayName: 'Google',
    theme: 'google',
    tagline: "Let's help you ace your Google interview",
  },
  meta: {
    name: 'meta',
    displayName: 'Meta',
    theme: 'meta',
    tagline: "Let's help you ace your Meta interview",
  },
  amazon: {
    name: 'amazon',
    displayName: 'Amazon',
    theme: 'amazon',
    tagline: "Let's help you ace your Amazon interview",
  },
  apple: {
    name: 'apple',
    displayName: 'Apple',
    theme: 'apple',
    tagline: "Let's help you ace your Apple interview",
  },
  microsoft: {
    name: 'microsoft',
    displayName: 'Microsoft',
    theme: 'microsoft',
    tagline: "Let's help you ace your Microsoft interview",
  },
  netflix: {
    name: 'netflix',
    displayName: 'Netflix',
    theme: 'netflix',
    tagline: "Let's help you ace your Netflix interview",
  },
};

export const roles: Record<string, { displayName: string; icon: string }> = {
  'software-engineer': { displayName: 'Software Engineer', icon: '💻' },
  'product-manager': { displayName: 'Product Manager', icon: '📊' },
  'data-scientist': { displayName: 'Data Scientist', icon: '📈' },
  'designer': { displayName: 'Designer', icon: '🎨' },
  'engineering-manager': { displayName: 'Engineering Manager', icon: '👥' },
};

export function getCompanyConfig(company: string): CompanyConfig | null {
  return companies[company.toLowerCase()] || null;
}

export function getRoleConfig(role: string) {
  return roles[role.toLowerCase()] || { displayName: role, icon: '💼' };
}
