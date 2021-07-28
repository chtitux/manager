class ApplicationHash {
  constructor(hash) {
    this.hash = hash;
    if (!this.hash) this.hash = '';
  }

  prepend(prefix) {
    let { hash } = this;
    if (!hash) hash = `#/${prefix}`;
    else hash = hash.replace(/\/([^/]*)/, `/${prefix}/$1`);
    return new ApplicationHash(hash);
  }

  shift() {
    return new ApplicationHash(this.hash.replace(/\/[^/]+/, ''));
  }

  getPrefix() {
    return (this.hash.match(/(\/[^/]+)/) || [null, '/'])[1];
  }

  normalize() {
    let { hash } = this;
    if (hash === '#') hash = '';
    hash = hash.replace(/\/\/+/g, '/');
    hash = hash.replace(/\/$/, '');
    return new ApplicationHash(hash);
  }

  isEqual(other) {
    return this.normalize().hash === other.normalize().hash;
  }

  toString() {
    return this.normalize().hash;
  }
}

window.ufrontendBootstrap = ({ applicationId, subApplications }) => {
  const iframe = document.querySelector('iframe');
  const isTopLevel = window.top === window.self;
  const isBottomLevel = !iframe;

  // only for debugging purposes, display iframe's URL
  const urlElt = document.getElementById('url');
  setInterval(() => {
    urlElt.innerHTML = window.location.href;
  }, 100);

  // propagate the navigation hash down
  function navigate() {
    const hash = new ApplicationHash(window.location.hash);
    const pathname = hash.getPrefix();
    const appHash = hash.shift();

    // restrict navigation to a list of sub apps if provided
    if (subApplications) {
      const idx = subApplications.indexOf(pathname.replace(/^\//, ''));
      if (idx < 0) {
        window.history.back();
        return;
      }
    }

    if (iframe) {
      // update iframe url
      iframe.contentWindow.location.replace(
        `${pathname}${pathname === '/' ? '' : '/'}${appHash}`,
      );
      // propagate down
      iframe.contentWindow.postMessage(
        {
          type: 'ufrontend',
          subtype: 'navigate',
        },
        '*',
      );
    }
  }

  if (isBottomLevel) {
    // only the bottom level app will bubble up hash update events
    window.addEventListener(
      'hashchange',
      () => {
        if (window.self === window.parent) return;
        window.parent.postMessage(
          {
            type: 'ufrontend',
            subtype: 'hashupdate',
            hash: new ApplicationHash(window.location.hash)
              .prepend(applicationId)
              .toString(),
          },
          '*',
        );
      },
      true,
    );
    // when opening a bottom level app the first time, bubble hash update event
    window.parent.postMessage(
      {
        type: 'ufrontend',
        subtype: 'hashupdate',
        hash: new ApplicationHash(window.location.hash)
          .prepend(applicationId)
          .toString(),
      },
      '*',
    );
  } else {
    // if not bottom level, listen for hash change and propagate navigation down
    window.addEventListener('hashchange', navigate, true);
  }

  // update starting application hash from the iframe src
  if (iframe) {
    const iframeTarget = new URL(iframe.src);
    const { pathname } = iframeTarget;
    const { hash } = iframeTarget;
    if (!window.location.hash) {
      window.location.replace(
        new ApplicationHash(hash).prepend(pathname).toString(),
      );
    }
    navigate();
  }

  function messageHandler({ data }) {
    if (data.type !== 'ufrontend') return;
    if (data.subtype === 'hashupdate') {
      if (!isTopLevel) {
        // propagate hash update events up
        window.parent.postMessage(
          {
            ...data,
            hash: new ApplicationHash(data.hash)
              .prepend(applicationId)
              .toString(),
          },
          '*',
        );
      } else if (window.location.hash !== data.hash) {
        // top level, update hash
        window.location.replace(data.hash);
      }
    } else if (data.subtype === 'navigate') {
      navigate();
    }
  }
  window.addEventListener('message', messageHandler, true);
};
