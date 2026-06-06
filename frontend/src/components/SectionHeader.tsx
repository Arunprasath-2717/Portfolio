import RevealOnScroll from "./RevealOnScroll";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <RevealOnScroll>
      <div className="text-center mb-16">
        <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">
          {label}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{title}</h2>
        {subtitle && (
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </RevealOnScroll>
  );
}
