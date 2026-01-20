type FundStaticSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function FundStaticSection({ title, children }: FundStaticSectionProps) {
  return (
    <div className="space-y-4">
      <p className="text-2xl lg:text-3xl font-semibold text-primary">{title}</p>
      <div className="lg:text-xl font-light text-black/80">{children}</div>
    </div>
  );
}
