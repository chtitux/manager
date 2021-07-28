const uid = window.UID;
const iframe = document.querySelector('iframe');

/**
 * This part is only for debug purposes, it allows to debug iframe's current URL.
 */
const urlElt = document.getElementById('url');
setInterval(() => {
  urlElt.innerHTML = window.location.href;
}, 250);

/**
 * Listen for URL / hash changes
 */
function onHashChange() {
  // propagate the event up
  if (window.self !== window.top) {
    const data = {
      type: 'ufrontend-child-event',
      // add application id to the hash and bubble the event up
      hash: window.location.hash.replace(/\/([^/]+)/, `/${uid}/$1`),
    };
    console.log(uid, 'POST', 'ufrontend-child-event', data);
    window.parent.postMessage(data, '*');
  }
  // propagate the event down
  if (iframe) {
    const data = {
      type: 'ufrontend-parent-event',
      hash: window.location.hash,
    };
    console.log(uid, 'POST', 'ufrontend-parent-event', data);
    iframe.contentWindow.postMessage(data, '*');
  }
}
window.addEventListener('hashchange', onHashChange);
window.addEventListener('popState', onHashChange);

/**
 * Handle messages
 */
window.addEventListener(
  'message',
  ({ data }) => {
    switch (data.type) {
      case 'ufrontend-child-event':
        console.log(uid, 'RECEIVE', 'ufrontend-child-event', data);
        window.location.replace(data.hash);
        break;
      case 'ufrontend-parent-event': {
        console.log(uid, 'RECEIVE', 'ufrontend-parent-event', data);
        const appPath = (data.hash.match(/(\/[^/]+)/) || [])[0];
        const hash = data.hash.replace(appPath, '');
        const target = `${appPath}/${hash}`;
        console.log('appPath', appPath, 'hash', hash);

        if (
          appPath &&
          appPath.replace(/\/$/, '') !==
            window.location.pathname.replace(/\/$/, '')
        ) {
          window.location.replace(target);
        } else if (window.location.hash !== hash) {
          window.location.replace(hash);
        }
        break;
      }
      case 'redirect':
        window.location.assign(data.url);
        break;
      default:
        break;
    }
  },
  false,
);

/**
 * At startup, for the top level shell, propagate current URL to childrens
 */
if (iframe) {
  const onLoad = function() {
    iframe.removeEventListener('load', onLoad);
    const data = {
      type: 'ufrontend-parent-event',
      hash: window.location.hash,
    };
    console.log(uid, 'POST', 'ufrontend-parent-event', data);
    iframe.contentWindow.postMessage(data, '*');
  };
  iframe.addEventListener('load', onLoad);
}
