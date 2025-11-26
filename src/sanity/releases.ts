import { ReleaseInfo } from "@/releases/releases";
import { defineQuery } from "next-sanity";

// TD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeArtistString = (sanityRelease: any): string => {
  if (sanityRelease.artists === undefined) {
    return "";
  }
  const artists = sanityRelease.artists as string[];
  if (artists.length === 1) {
    return artists[0];
  }
  else if (artists.length === 2) {
    return artists[0] + " & " + artists[1];
  }
  else {
    return artists.join(", ");
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCurrentSlug = (sanityResult:any): string => {
  if(sanityResult.slug !== undefined) {
    return sanityResult.slug.current;
  }
  return "<SLUGFAIL>";
}

// TD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeLocalReleaseInfo = (sanityRelease: any): ReleaseInfo => {
  return {
    slug: parseCurrentSlug(sanityRelease),
    artist: makeArtistString(sanityRelease),
    title: sanityRelease.name,
    bandcampEmbedUrl: sanityRelease.bandcampEmbedUrl,
    buyLink: sanityRelease.buyLink,
    streamLink: sanityRelease.streamLink,
    releaseType: sanityRelease.releaseType,
    releaseDate: new Date(sanityRelease.releaseDate)
  };
};

export const isBandcampEmbedUrlValid = (info: ReleaseInfo) => {
  return info.bandcampEmbedUrl !== undefined && info.bandcampEmbedUrl !== null && info.bandcampEmbedUrl !== "";
};

export const RELEASED_RELEASES_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && releaseDate < now()
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, buyLink, streamLink, releaseType
      }|order(releaseDate desc)`);

export const SINGLE_RELEASE_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && slug.current == $slug 
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, buyLink, streamLink, releaseType
      }|order(releaseDate desc)`);

export const LATEST_RELEASE_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && releaseDate < now()
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, buyLink, streamLink, releaseType
      }|order(releaseDate desc)[0]`);