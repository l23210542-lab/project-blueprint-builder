export function PageShell({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}
