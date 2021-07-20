import bootstrapApp from './index';

export default function bootstrapShellApplication({ app }) {
  function redirectToShell() {
    const url = new URL(window.location);
    url.pathname = 'shell';
    url.hash = url.hash.replace(/\/([^/]+)/, `/${app}/$1`);
    window.location.replace(url.href);
  }
  return bootstrapApp({ app, redirectToShell, useAppPrefix: true });
}
