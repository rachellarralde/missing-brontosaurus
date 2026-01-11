import { ReleaseLink } from "@/sanity/sanity.types";

export interface ReleaseInfo {
    slug: string;
    artist: string;
    title: string;
    /** @deprecated */
    path?: string;
    /** @deprecated the full embed code from bandcamp */
    bandcampEmbed?: string;
    /** the URL the bandcamp ifram needs to src */
    bandcampEmbedUrl?: string;
    links: ReleaseLink[],
    releaseType?: string;
    releaseDate?: Date
}

export const isReleaseSingle = (info: ReleaseInfo): boolean => {
    return info.releaseType == "Single";
}

export const bandcampPlayerWidth = 420;
export const bandcampPlayerHeight = 512;
export const bandcampAlbumPlayerHeight = 622;
// bandcamp THEME = BLACK, LINKS = GREEN
