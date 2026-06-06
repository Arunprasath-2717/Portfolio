import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import { GraduationCap } from "lucide-react";

const exploring = [
  "System Design",
  "Cloud Computing",
  "Agentic AI",
  "Scalable Backend Architecture",
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="About"
          title="Who I Am"
          subtitle="A developer focused on building practical software solutions that combine engineering with intelligence"
        />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio */}
          <RevealOnScroll>
            <div className="glass-card p-8 h-full">
              <p className="text-muted leading-relaxed mb-6">
                I&apos;m a Third-Year Computer Science and Engineering student
                passionate about building scalable web applications, intelligent
                systems, and real-world software solutions.
              </p>
              <p className="text-muted leading-relaxed">
                With hands-on experience in Full-Stack Development, Backend
                Engineering, and Artificial Intelligence, I enjoy transforming
                ideas into practical products that solve meaningful problems.
              </p>
            </div>
          </RevealOnScroll>

          {/* Education */}
          <RevealOnScroll delay={100}>
            <div className="glass-card p-8 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                  <GraduationCap size={24} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    B.E. Computer Science &amp; Engineering
                  </h3>
                  <p className="text-xs text-muted">2024 – 2028</p>
                </div>
              </div>
              <p className="text-muted text-sm mb-1">
                Sri Shakthi Institute of Engineering and Technology
              </p>
              <p className="text-muted text-sm mb-4">Coimbatore, India</p>
              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-sm text-muted">Current CGPA</span>
                <span className="text-2xl font-bold text-primary ml-3">
                  8.2
                </span>
                <span className="text-sm text-muted"> / 10</span>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Currently Exploring */}
        <RevealOnScroll delay={200}>
          <div className="mt-12 text-center">
            <h3 className="text-sm font-medium text-secondary tracking-[0.2em] uppercase mb-6">
              Currently Exploring
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {exploring.map((item) => (
                <span key={item} className="skill-chip">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
