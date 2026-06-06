import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    role: "Full Stack Web Development Intern",
    company: "Ascentz Technologies, Coimbatore",
    type: "On-Site",
    responsibilities: [
      "Designed and developed web application components",
      "Worked on frontend and backend integration",
      "Participated in API development and database operations",
      "Improved debugging, deployment, and version-control practices",
    ],
    skills: [
      "Full Stack Development",
      "API Integration",
      "Database Management",
      "Software Testing",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    company: "Thiranex",
    type: "Virtual",
    responsibilities: [
      "Developed web application modules and interfaces",
      "Worked with frontend-backend communication mechanisms",
      "Practiced responsive web design and application architecture",
      "Applied version control and deployment methodologies",
    ],
    skills: [
      "Web Development",
      "Frontend Engineering",
      "Backend Development",
      "Software Design",
    ],
  },
  {
    role: "AI & Machine Learning Intern",
    company: "Pluto Academy",
    type: "Virtual",
    responsibilities: [
      "Explored machine learning algorithms and AI concepts",
      "Worked on data preprocessing and model training workflows",
      "Studied supervised and unsupervised learning techniques",
      "Gained exposure to AI tools, datasets, and evaluation methods",
    ],
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Analysis",
      "Model Evaluation",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Experience"
          title="Professional Experience"
          subtitle="Real-world internship experience across full-stack and AI domains"
        />

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <div className="glass-card p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <p className="text-muted text-sm mt-1">{exp.company}</p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary shrink-0">
                    {exp.type}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {exp.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="text-muted text-sm flex items-start gap-3"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-white/[0.06]">
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="skill-chip text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
