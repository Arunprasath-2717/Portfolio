import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import { Code, Zap, Bot, FileSpreadsheet } from "lucide-react";

const certifications = [
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    icon: <Code size={20} className="text-primary" />,
  },
  {
    title: "JavaScript (ES6+)",
    issuer: "Udemy",
    icon: <Zap size={20} className="text-secondary" />,
  },
  {
    title: "Prompt Engineering",
    issuer: "IBM Cognizant",
    icon: <Bot size={20} className="text-primary" />,
  },
  {
    title: "Excel Skills for Business",
    issuer: "Coursera",
    icon: <FileSpreadsheet size={20} className="text-secondary" />,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Certifications"
          title="Continuous Learning"
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <RevealOnScroll key={cert.title} delay={i * 50}>
              <div className="glass-card p-5 flex items-center gap-4 hover:border-secondary/30 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{cert.title}</h3>
                  <p className="text-xs text-muted mt-1">{cert.issuer}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
