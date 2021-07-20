import { parseHash } from './url';

export default {
  getStartingURL: () => {
    const { hash } = parseHash(window.location.hash);
    const url = new URL('http://localhost:9000');
    if (hash) url.hash = hash;
    return url;
  },
};
