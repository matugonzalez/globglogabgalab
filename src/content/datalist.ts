import { getCollection } from 'astro:content';

const books = await getCollection('books');

export const  datalist = books.map( (x) => {
    return { 
        id: x.id, 
        slug: x.slug,
        title: x.data.title,
    }
})
