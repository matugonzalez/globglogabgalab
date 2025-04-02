import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_B-hEWDeR.mjs';
import { manifest } from './manifest_BolOd5fX.mjs';

const serverIslandMap = new Map([
	['BookScore', () => import('./chunks/BookScore_Bztfx4wX.mjs')],
	['BuyButton', () => import('./chunks/BuyButton_-DN3Tysc.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/books/_id_.astro.mjs');
const _page2 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/books/[id].astro", _page1],
    ["src/pages/index.astro", _page2]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "38b98da5-9e80-42ee-805e-345f685f87e7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
