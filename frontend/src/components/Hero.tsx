import SoftAurora from "./SoftAurora";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Soft Aurora Background */}
      <div className="absolute inset-0 z-0">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={1.0}
          color1="#0a0a0f"
          color2="#06B6D4"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <p className="text-muted text-sm tracking-[0.3em] uppercase mb-8 font-medium motionable-element">
          Arun Prasath P
        </p>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-8 tracking-tight motionable-element" style={{ animationDelay: "100ms" }}>
          Building intelligent software
          <br className="hidden sm:block" />
          {" through "}
          <span className="gradient-text">Backend Engineering</span>
          <br className="hidden sm:block" />
          {" and "}
          <span className="gradient-text">AI</span>.
        </h1>

        <p className="text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed motionable-element" style={{ animationDelay: "200ms" }}>
          Third-year CSE student crafting scalable web applications and
          intelligent systems with modern technologies.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-12 mb-14 motionable-element" style={{ animationDelay: "300ms" }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              3
            </div>
            <div className="text-sm text-muted mt-1">Internships</div>
          </div>
          <div className="w-px h-12 bg-white/[0.08]" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              2
            </div>
            <div className="text-sm text-muted mt-1">Production Projects</div>
          </div>
          <div className="w-px h-12 bg-white/[0.08]" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              1
            </div>
            <div className="text-sm text-muted mt-1">Technical Event</div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap motionable-element" style={{ animationDelay: "400ms" }}>
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 motionable-element" style={{ animationDelay: "600ms" }}>
          <span className="text-xs font-medium text-muted uppercase tracking-[0.2em] opacity-80">
            Scroll to explore
          </span>
          <ChevronDown size={20} className="text-muted animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
}
