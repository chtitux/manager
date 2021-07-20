import { parseHash } from './url';

export default {
  getStartingURL: () => {
    const { app, hash } = parseHash(window.location.hash);
    const url = new URL(window.location);
    url.pathname = `${app || 'hub'}/`;
    if (hash) url.hash = hash;
    return url;
  },
};
