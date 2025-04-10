type Book = {
    title: string;
    author: string;
    img: string;
    slug: string;
    description: string;
    popularity: number;
}
type Result = {
    item: Book,
    refIndex: number,
    score: number,
}
export type {
    Book,
    Result,
}