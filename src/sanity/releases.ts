import { ReleaseInfo } from "@/releases/releases";
import { defineQuery } from "next-sanity";

export const makeArtistString = (sanityRelease: any): string =>
{
    if(sanityRelease.artists === undefined)
    {
        return "";
    }
    const artists = sanityRelease.artists as string[];
    if(artists.length === 1)
    {
        return artists[0];
    }
    else if(artists.length === 2)
    {
        return artists[0] + " & " + artists[1];
    }
    else
    {
        return artists.join(", ");
    }
}

export const makeLocalReleaseInfo = (sanityRelease: any): ReleaseInfo =>
    {

        return {
            artist: makeArtistString(sanityRelease),
            title: sanityRelease.name,
            bandcampEmbedUrl: sanityRelease.bandcampEmbedUrl,
            buyLink: sanityRelease.buyLink,
            streamLink: sanityRelease.streamLink,
            releaseType: sanityRelease.releaseType,
        };
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
        && releaseDate < now()
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