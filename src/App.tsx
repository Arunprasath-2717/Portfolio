import { useEffect } from 'react';
import { RouterProvider, useRouter } from './lib/router';
import { initSmoothScroll } from './lib/smooth';
import { FLAGSHIPS } from './content';
import { Nav, Footer } from './components/Chrome';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import { ScrollProgress, TargetCursor } from './components/fx/Motion';
import { installClickSpark } from './components/fx/anime';

function Routes() {
  const { path } = useRouter();
  if (path === '/') return <Home />;
  const m = path.match(/^\/work\/([a-z0-9-]+)$/);
  const project = m && FLAGSHIPS.find((f) => f.slug === m[1]);
  if (project) return <CaseStudy key={project.slug} project={project} />;
  return <NotFound />;
}

export default function App() {
  useEffect(() => initSmoothScroll(), []);
  useEffect(() => installClickSpark(), []);
  return (
    <RouterProvider>
      <a className="skip" href="#main">Skip to content</a>
      <ScrollProgress />
      <Nav />
      <Routes />
      <Footer />
      <TargetCursor />
    </RouterProvider>
  );
}
