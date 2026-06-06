import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";

const skillCategories = [
  {
    title: "Programming",
    skills: ["Python", "C", "C++", "Java", "JavaScript", "SQL"],
  },
  {
    title: "Backend",
    skills: ["FastAPI", "Flask", "REST APIs", "JWT Auth", "Session Auth"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "ES6+", "Responsive Design"],
  },
  {
    title: "Databases",
    skills: ["MongoDB Atlas", "PostgreSQL", "Redis"],
  },
  {
    title: "AI & Machine Learning",
    skills: ["NLP", "Hugging Face", "NER", "Model Integration"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Render", "Railway", "Vercel", "Postman"],
  },
  {
    title: "Core CS",
    skills: ["DSA", "DBMS", "OOP", "Operating Systems", "Networks"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Skills"
          title="Technologies I Work With"
          subtitle="No progress bars — just the tools I actually build with"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <RevealOnScroll key={cat.title} delay={i * 60}>
              <div className="glass-card p-6 h-full">
                <h3 className="text-xs font-medium text-primary tracking-[0.2em] uppercase mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
