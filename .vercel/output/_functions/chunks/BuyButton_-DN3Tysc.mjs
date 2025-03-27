import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate } from './astro/server_T3E4KyEv.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$BuyButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BuyButton;
  const SPAIN = "ES";
  const country = Astro2.request.headers.get("X-Vercel-IP-country") ?? "ES";
  const storeCountry = country === SPAIN ? "spain" : "usa";
  const countryName = country === SPAIN ? "Espa\xF1a" : "Estados Unidos";
  const { buy } = Astro2.props;
  const url = buy[storeCountry];
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} title="Comprar Libro" target="_blank" rel="noopener no referrer" class="text-balance inline-flex gap-2 items-center bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg border border-yellow-500 transition duration-200 ease-in-out hover:scale-105 justify-center text-center">
Comprar en Mercado Libre ${countryName} </a>`;
}, "C:/Users/minid/Desktop/mateo-gonzalez/astro-site/src/components/BuyButton.astro", void 0);

const $$file = "C:/Users/minid/Desktop/mateo-gonzalez/astro-site/src/components/BuyButton.astro";
const $$url = undefined;

export { $$BuyButton as default, $$file as file, $$url as url };
