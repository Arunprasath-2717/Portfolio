import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";

const journeyItems = [
  {
    year: "2024",
    title: "Started B.E. in CSE",
    description:
      "Began Computer Science journey at Sri Shakthi Institute, Coimbatore",
  },
  {
    year: "2025",
    title: "Full Stack Internship",
    description:
      "Completed on-site internship at Ascentz Technologies, Coimbatore",
  },
  {
    year: "2025",
    title: "AI & ML Internship",
    description:
      "Completed virtual AI/ML internship at Pluto Academy",
  },
  {
    year: "2025",
    title: "Thiranex Internship",
    description:
      "Virtual Full Stack internship focused on modern web technologies",
  },
  {
    year: "2026",
    title: "Built Atlox AI",
    description:
      "Developed an AI-powered news intelligence platform from scratch",
  },
  {
    year: "2026",
    title: "Organized Render Rush",
    description:
      "Led a technical event at Kalam 2026 — DSA & Web Development",
  },
  {
    year: "Present",
    title: "Seeking Opportunities",
    description:
      "Actively pursuing Software Engineering roles to build impactful products",
    highlight: true,
  },
];

export default function Journey() {
  return (
    <section id="journey" className="section-padding">
      <div className="max-w-2xl mx-auto">
        <SectionHeader label="Journey" title="My Path So Far" />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-white/[0.06] to-transparent" />

          <div className="space-y-10">
            {journeyItems.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 80}>
                <div className="relative pl-10 group">
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-background ${
                      item.highlight
                        ? "bg-secondary shadow-[0_0_0_4px_rgba(6,182,212,0.15)]"
                        : "bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                    }`}
                  />

                  <span
                    className={`text-xs font-medium tracking-wider uppercase ${
                      item.highlight ? "text-secondary" : "text-primary"
                    }`}
                  >
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold mt-1 group-hover:text-primary transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
