import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import { Mic, Trophy, Target, Rocket, Lightbulb } from "lucide-react";

const leadership = {
  role: "Organizer & Event Lead",
  event: "Render Rush - Kalam 2026",
  description:
    "Successfully organized and conducted Render Rush, a technical event focused on Data Structures & Algorithms (DSA) and Web Development during the annual college technical fest, Kalam.",
  responsibilities: [
    "Planned and coordinated the entire event lifecycle",
    "Designed event structure, rules, and evaluation criteria",
    "Managed registrations and participant communication",
    "Coordinated volunteers and faculty members",
    "Conducted technical rounds and evaluations",
  ],
};

const achievements = [
  {
    icon: <Trophy size={20} className="text-primary" />,
    title: "2nd Place – Code Rush",
    subtitle: "Kanam 2K26, NGP College",
  },
  {
    icon: <Target size={20} className="text-primary" />,
    title: "Organizer & Event Lead",
    subtitle: "Render Rush, Kalam 2026",
  },
  {
    icon: <Rocket size={20} className="text-primary" />,
    title: "Participant",
    subtitle: "Odoo Hackathon",
  },
  {
    icon: <Lightbulb size={20} className="text-primary" />,
    title: "Participant",
    subtitle: "GUVI Buildathon",
  },
];

export default function BeyondCoding() {
  return (
    <section id="beyond" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Beyond Coding"
          title="Leadership & Achievements"
          subtitle="Hackathons, technical events, and continuous learning"
        />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Leadership - takes 3 columns */}
          <RevealOnScroll className="md:col-span-3">
            <div className="glass-card p-8 h-full border-t-4 border-t-secondary/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-lg">
                  <Mic size={20} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">{leadership.role}</h3>
                  <p className="text-xs text-secondary tracking-wider uppercase mt-1">
                    {leadership.event}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed mb-6">
                {leadership.description}
              </p>
              <ul className="space-y-3">
                {leadership.responsibilities.map((r, i) => (
                  <li
                    key={i}
                    className="text-muted text-sm flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 mt-1.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          {/* Achievements - takes 2 columns */}
          <div className="md:col-span-2 space-y-4">
            {achievements.map((item, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="glass-card p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
