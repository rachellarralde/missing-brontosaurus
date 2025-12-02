import { Metadata } from "next";

export const makePageTitle = (title: string) => {
    return `Missing Brontosaurus | ${title}`;
};

export const makePageMetadata = (title: string, description?: string): Metadata => {
    return {
        title: makePageTitle(title),
        description: description ?? title,
    }
};
