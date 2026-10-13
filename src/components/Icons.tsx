export function Arrow({ dir = 'right' }: { dir?: 'right' | 'out' }) {
  const d = dir === 'out' ? 'M5 15 15 5M7 5h8v8' : 'M3 10h13M11 5l5 5-5 5';
  return (
    <svg className="ico" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
      <path d={d} />
    </svg>
  );
}
