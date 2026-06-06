import RevealOnScroll from "./RevealOnScroll";
import SectionHeader from "./SectionHeader";
import { Mail, Code } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding pb-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="Contact"
          title="Let's Build Something"
          subtitle="Currently seeking Software Engineering opportunities."
        />

        <RevealOnScroll>
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[150px] bg-primary/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Ready to collaborate?</h3>
              <p className="text-muted mb-8 max-w-lg mx-auto">
                Whether you have an exciting project, a role to fill, or just
                want to talk about tech, my inbox is always open.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <a
                  href="mailto:arunprasath6035@gmail.com"
                  className="btn-primary w-full sm:w-auto"
                >
                  <Mail size={18} />
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/arun-prasath-p-6ar01333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Arunprasath-2717"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.5 5.5 0 0 0 19 5.5A5.5 5.5 0 0 0 18.5 2a5.5 5.5 0 0 0-3.5 1.5 10.9 10.9 0 0 0-6 0A5.5 5.5 0 0 0 5.5 2 5.5 5.5 0 0 0 5 5.5a5.5 5.5 0 0 0 1.5 2.3 5.5 5.5 0 0 0-1.5 5.3C5.5 19.5 8 20.8 11.1 21A4.8 4.8 0 0 0 10 22v4"></path></svg>
                  GitHub
                </a>
                <a
                  href="https://leetcode.com/u/_Arun_prasath_07_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto"
                >
                  <Code size={18} />
                  LeetCode
                </a>
              </div>

              {/* GitHub Activity Stats */}
              <div className="grid grid-cols-3 gap-4 border-t border-white/[0.06] pt-8 mt-8">
                <div>
                  <div className="text-2xl font-bold text-foreground">2+</div>
                  <div className="text-xs text-muted uppercase tracking-wider mt-1">
                    Projects
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <div className="text-xs text-muted uppercase tracking-wider mt-1">
                    Internships
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground mt-1">
                    Py, JS, SQL
                  </div>
                  <div className="text-xs text-muted uppercase tracking-wider mt-1.5">
                    Core Stack
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <span className="text-lg font-bold gradient-text">Arun Prasath P</span>
              <p className="text-sm text-muted mt-3 leading-relaxed max-w-xs">
                Backend Engineer & AI enthusiast building scalable, intelligent software solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                {["About", "Journey", "Projects", "Experience"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">Connect</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="mailto:arunprasath6035@gmail.com" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                    arunprasath6035@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/arun-prasath-p-6ar01333" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Arunprasath-2717" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://leetcode.com/u/_Arun_prasath_07_/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                    LeetCode
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted/60">
              &copy; {new Date().getFullYear()} Arun Prasath P. All rights reserved.
            </p>
            <p className="text-xs text-muted/40">
              Designed &amp; built with precision.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
