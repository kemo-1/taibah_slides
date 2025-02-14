import { p as promiseResolve, b as bootstrapLazy } from './index-04d5de89.js';
export { s as setNonce } from './index-04d5de89.js';

/*
 Stencil Client Patch Browser v4.0.5 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["poll-party",[[1,"poll-party",{"host":[1],"party":[1],"room":[32],"poll":[32],"votes":[32],"socket":[32],"selectedOption":[32]}]]]], options);
});

//# sourceMappingURL=poll-party.js.map