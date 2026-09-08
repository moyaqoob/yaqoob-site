export type View = 'home' | 'writing' | 'projects' | 'work';

export function routeFromHash(): View {
  const raw = window.location.hash.replace(/^#/, '');
  const path = raw.split('?')[0].replace(/^\//, '');
  if (path === 'writing' || path.startsWith('writing-') || path.startsWith('writing/')) {
    return 'writing';
  }
  if (path === 'projects' || path.startsWith('projects')) {
    return 'projects';
  }
  if (path === 'work' || path === 'work-experience' || path.startsWith('work')) {
    return 'work';
  }
  return 'home';
}
