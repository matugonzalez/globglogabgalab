import Fuse, { type FuseResult } from "fuse.js";
import type { Book } from "./types";

const search = document.querySelector('#search') as HTMLInputElement;
const searchReadout = document.querySelector('#searchReadout') as HTMLElement;
const resultsList = document.querySelector('#resultsList') as HTMLElement;

let SEARCH_DATA:Array<Book>;
let FUSE_INSTANCE: Fuse<Book>;
const FUSE_OPTIONS = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.5,
    keys: [
        {
            name: 'title',
            weight: 1,
        },
        {
            name: 'description',
            weight: 0.2,
        }
    ]
}

const updateDocumentTitle = (search:string) => {
    document.title = search
        ? `Search results for "${search}"`
        : 'Search the blog';
} 

const updateSearchReadout = (search:string) => {
    searchReadout.textContent = search
        ? `Search results for "${search}"`
        : 'no search';
}

const updateSearchPageUrl = (searchTerm: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchTerm);
    window.history.replaceState(null, '', url)
}

const generateSearchList = (results:FuseResult<Book>[]) => {
    const items = results.map((r)=> {
        const {title,author, img, description, slug} = r.item;
        return `
            <li 
                class='flex gap-2 p-2 w-2xs sm:w-sm rounded-md hover:scale-105 bg-linear-60 from-amber-500 via-amber-400 to-amber-300 text-amber-950 '
            >
                <a 
                    href='/books/${slug}'
                    class='flex gap-2 w-full'
                >
                    <img 
                        class='w-15 rounded-sm sm:w-22 sm:rounded-lg h-full aspect-[5/7]' 
                        src='/covers/${img}' 
                        alt='${slug}'
                    >
                    <div 
                        class='flex flex-col'
                    >
                        <span
                            class='font-semibold tracking-tighter text-md'
                        >
                            ${title}
                        </span>
                        <span
                            class='font-semibold text-sm text-amber-700'
                        >
                            ${author}
                        </span>
                        <span
                            class='text-xs line-clamp-3'
                        >
                            ${description}
                        </span>
                    </div>
                </a>
            </li>
        `

    }).join('');
    return items;
}
async function fetchSearchResults(search:string) {
    if (search.length === 0 ) return;
    resultsList.innerHTML = 'Loading...';
    if (!SEARCH_DATA) {
        try {
            const res = await fetch('/search/search.json');
            if (!res.ok) {
                throw new Error('Something went wrong...');
            }
            const data = await res.json();
            SEARCH_DATA = data;
        }
        catch(err) {
            console.error(err);
        }
    }
    if (SEARCH_DATA && !FUSE_INSTANCE) {
        FUSE_INSTANCE = new Fuse(SEARCH_DATA, FUSE_OPTIONS);
    }
    if(!FUSE_INSTANCE) return;

    const searchResult = FUSE_INSTANCE.search(search)
    if (!resultsList) return;
    resultsList.innerHTML = 
            searchResult.length > 0
            ? generateSearchList(searchResult)
            : 'No results found.'
}



window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search).get('q');

    if (!(search && urlParams)) return;
    fetchSearchResults(urlParams);
    updateDocumentTitle(urlParams);
    updateSearchReadout(urlParams);
    search.value = urlParams;
    search.focus();

});
search.addEventListener('input', () => {
    const searchTerm = search.value;
    fetchSearchResults(searchTerm);
    updateDocumentTitle(searchTerm);
    updateSearchReadout(searchTerm);
    updateSearchPageUrl(searchTerm);
});