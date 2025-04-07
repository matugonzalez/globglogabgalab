import { getCollection } from "astro:content";

async function getBooks() {
    const books = (await getCollection('books'))
    return books.map((book) => ({
            title: book.data.title,
            slug: book.slug,
            img: book.data.img,
            description: book.data.description,
            popularity: book.data.popularity,   
        })
    )
}

export async function GET({}) {
    return new Response(JSON.stringify(await getBooks()), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
};