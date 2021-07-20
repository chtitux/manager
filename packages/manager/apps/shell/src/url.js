export const parseHash = (shellHash) => {
  const [, app, hash] = (shellHash || '').split(/#\/([^/]+)/);
  return { app, hash };
};

export default {
  parseHash,
};
