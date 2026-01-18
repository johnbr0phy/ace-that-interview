import Link from 'next/link';

/**
 * Home Page
 *
 * Simple landing that directs users to company-specific onboarding flows.
 */
export default function Home() {
  const companies = [
    { name: 'Google', slug: 'google', role: 'software-engineer' },
    { name: 'Meta', slug: 'meta', role: 'software-engineer' },
    { name: 'Amazon', slug: 'amazon', role: 'software-engineer' },
    { name: 'Apple', slug: 'apple', role: 'software-engineer' },
    { name: 'Microsoft', slug: 'microsoft', role: 'software-engineer' },
    { name: 'Netflix', slug: 'netflix', role: 'software-engineer' },
  ];

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ padding: 24 }}
    >
      <div className="w-full max-w-lg text-center">
        <h1
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--foreground)',
            marginBottom: 8,
          }}
        >
          JobWiz
        </h1>
        <p
          style={{
            fontSize: 18,
            color: 'var(--secondary)',
            marginBottom: 48,
          }}
        >
          Your personalized interview prep coach
        </p>

        <div
          style={{
            background: 'var(--surface-elevated)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--foreground)',
              marginBottom: 20,
            }}
          >
            Choose your company
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {companies.map((company) => (
              <Link
                key={company.slug}
                href={`/${company.slug}/${company.role}`}
                className="transition-all hover:border-[var(--primary)] hover:bg-[var(--primary-light)]"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 52,
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--faint)',
                  background: 'var(--surface)',
                  color: 'var(--foreground)',
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {company.name}
              </Link>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: 14,
            color: 'var(--muted)',
            marginTop: 24,
          }}
        >
          Get a personalized study plan in 2 minutes
        </p>
      </div>
    </main>
  );
}
