'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-9c591916.js');

/*
 Stencil Client Patch Browser v4.0.5 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('poll-party.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["poll-party.cjs",[[1,"poll-party",{"host":[1],"party":[1],"room":[32],"poll":[32],"votes":[32],"socket":[32],"selectedOption":[32]}]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=poll-party.cjs.js.map