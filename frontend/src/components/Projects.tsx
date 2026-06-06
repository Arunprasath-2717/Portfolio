import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";

const projects = [
  {
    title: "Atlox AI",
    tagline: "News Intelligence Platform",
    problem:
      "Staying informed requires visiting multiple news sources. Existing aggregators lack intelligent analysis, entity recognition, and semantic search capabilities.",
    solution:
      "Built an AI-powered platform that collects, analyzes, and summarizes news from 5 APIs using NLP — featuring automated summarization, named entity recognition, and semantic search with Redis-optimized performance.",
    architecture: [
      {
        label: "5 News APIs",
        sub: "NewsAPI • GNews • Currents • TheNewsAPI • Mediastack",
      },
      {
        label: "FastAPI Backend",
        sub: "REST API • JWT Auth • NLP Pipeline",
      },
      {
        label: "Redis Cache",
        sub: "Response Caching • Performance Optimization",
      },
      {
        label: "PostgreSQL",
        sub: "Articles • Users • Analytics Storage",
      },
      {
        label: "React Dashboard",
        sub: "Search • Analytics • NER Visualization",
      },
    ],
    techStack: [
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "Redis",
      "Hugging Face",
      "REST APIs",
    ],
    impact:
      "Complete full-stack application built from scratch — multi-API integration, AI-powered text analysis, and Redis caching for optimized data retrieval across the entire pipeline.",
  },
  {
    title: "Projexa",
    tagline: "Academic Project Management System",
    problem:
      "Academic project submission and tracking lacks organization, secure access controls, and a centralized management system for students and faculty.",
    solution:
      "Created a full-stack platform streamlining project submission, tracking, and management with role-based access control and comprehensive dashboards for both students and faculty.",
    architecture: [
      {
        label: "Authentication Layer",
        sub: "Login • Registration • Session Management",
      },
      {
        label: "Flask Backend",
        sub: "RBAC • PDF Validation • API Routes",
      },
      {
        label: "MongoDB Atlas",
        sub: "Projects • Users • Submissions",
      },
      {
        label: "Web Interface",
        sub: "Student & Faculty Dashboards",
      },
    ],
    techStack: ["Flask", "MongoDB Atlas", "HTML5", "CSS3", "JavaScript"],
    impact:
      "Managed academic project workflows with secure role-based access controls, delivering a user-friendly management solution for educational institutions.",
  },
];

function ArchitectureDiagram({
  nodes,
}: {
  nodes: { label: string; sub: string }[];
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {nodes.map((node, j) => (
        <div key={j} className="w-full max-w-sm">
          {j > 0 && (
            <div className="arch-arrow">
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 0v12m0 0L1 7m5 5l5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <div className="arch-node">
            <div className="font-medium text-sm">{node.label}</div>
            <div className="text-xs text-muted mt-1">{node.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="Projects"
          title="Featured Work"
          subtitle="Production-ready applications built from the ground up"
        />

        <div className="space-y-16">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.title} delay={i * 150}>
              <div className="glass-card-static overflow-hidden">
                {/* Header with gradient top border */}
                <div
                  className="h-1"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-primary), var(--color-secondary))",
                  }}
                />

                <div className="p-8 md:p-10 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-muted uppercase tracking-wider">
                      {project.tagline}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold gradient-text inline-block">
                    {project.title}
                  </h3>
                </div>

                <div className="p-8 md:p-10 space-y-8">
                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3">
                        The Problem
                      </h4>
                      <p className="text-muted text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-secondary uppercase tracking-[0.2em] mb-3">
                        The Solution
                      </h4>
                      <p className="text-muted text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h4 className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-5">
                      Architecture
                    </h4>
                    <ArchitectureDiagram nodes={project.architecture} />
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="skill-chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="border-t border-white/[0.06] pt-6">
                    <h4 className="text-xs font-medium text-secondary uppercase tracking-[0.2em] mb-3">
                      Impact
                    </h4>
                    <p className="text-muted text-sm leading-relaxed">
                      {project.impact}
                    </p>
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
