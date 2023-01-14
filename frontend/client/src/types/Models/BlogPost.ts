import { StandardImage } from "./Standard"

export type BlogPostModel = {
    /** Internal ID for getting/vizualiztion */
    postId: string;
    /** Display title */
    title: string;
    /** Subtitle relative to the title */
    subtitle?: string;
    /** Date (UNIX) it was published */
    created: number;
    /** Date (UNIX) it was last updated */
    updated?: number;
    /** Masthead image as an absolute URL */
    masthead?: string;
    /** Blog content */
    content: Array<BlogPostContent>;
}

export type BlogPostContent = {
    /** Section header */
    header?: string;
    /** Subheader associated w/ header */
    subheader?: string;
    /** Body content - strings of text or image URIs */
    body: (string | StandardImage)[];
}


