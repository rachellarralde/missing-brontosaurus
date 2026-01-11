import { ReleaseInfo } from "@/releases/releases";
import { defineQuery } from "next-sanity";
import { Release, ReleaseLink } from "./sanity.types";
import { sanityFetch } from "./live";

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
export const parseCurrentSlug = (sanityResult: any): string => {
  if (sanityResult.slug !== undefined) {
    return sanityResult.slug.current;
  }
  return "<SLUGFAIL>";
}

// TD
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const makeLocalReleaseInfo = (sanityRelease: Release): ReleaseInfo => {
  const info = {
    slug: parseCurrentSlug(sanityRelease),
    artist: makeArtistString(sanityRelease),
    title: sanityRelease.name ?? "",
    bandcampEmbedUrl: sanityRelease.bandcampEmbedUrl,
    links: sanityRelease.links ?? [],
    releaseType: sanityRelease.releaseType,
    releaseDate: sanityRelease.releaseDate ? new Date(sanityRelease.releaseDate) : undefined
  };

  // deprecated: if the old links are specified, push them into the array
  if (sanityRelease.buyLink !== undefined && sanityRelease.buyLink !== null && sanityRelease.buyLink !== "") {
    info.links.push({
      _key: sanityRelease.buyLink ?? "deprecatedBuyLink",
      _type: "releaseLink",
      linkType: "Buy",
      url: sanityRelease.buyLink
    });
  }
  if (sanityRelease.streamLink !== undefined && sanityRelease.streamLink !== null && sanityRelease.streamLink !== "") {
    info.links.push({
      _key: sanityRelease.streamLink ?? "deprecatedBuyLink",
      _type: "releaseLink",
      linkType: "Buy",
      url: sanityRelease.streamLink
    });
  }

  return info;
};

export const isBandcampEmbedUrlValid = (info: ReleaseInfo) => {
  return info.bandcampEmbedUrl !== undefined && info.bandcampEmbedUrl !== null && info.bandcampEmbedUrl !== "";
};

const RELEASED_RELEASES_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && releaseDate < now()
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, links, buyLink, streamLink, releaseType
      }|order(releaseDate desc)`);

export const fetchReleasedReleases = async (): Promise<Release[]> => {
  const { data } = await sanityFetch({ query: RELEASED_RELEASES_QUERY });
  return data as Release[];
}

const SINGLE_RELEASE_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && slug.current == $slug 
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, links, buyLink, streamLink, releaseType
      }|order(releaseDate desc)[0]`);

export const fetchSingleRelease = async (params: Promise<{ slug: string }>): Promise<Release> => {
  const { data } = await sanityFetch({ query: SINGLE_RELEASE_QUERY, params: await params });
  return data as Release;
}

const LATEST_RELEASE_QUERY = defineQuery(`*[
        _type == "release"
        && defined(slug.current)
        && releaseDate < now()
      ]{
        _id, name, slug, releaseDate, "artists": artists[]->name, bandcampEmbedUrl, links, buyLink, streamLink, releaseType
      }|order(releaseDate desc)[0]`);

export const fetchLatestRelease = async (): Promise<Release> => {
  const { data } = await sanityFetch({ query: LATEST_RELEASE_QUERY });
  return data as Release;
}

export const getLinkText = (parent: ReleaseInfo, link: ReleaseLink) => {
  if (link.label !== undefined) {
    return link.label;
  }
  const isPreOrder = parent.releaseDate !== undefined ? parent.releaseDate > new Date() : false;
  switch (link.linkType) {
    case "Buy":
      return isPreOrder ? "Pre Order" : "Buy";
    case "Stream":
      return isPreOrder ? "Pre Save" : "Stream";
    case "Vinyl":
      return isPreOrder ? "Pre Order Vinyl" : "Purchase Vinyl";
    case "Other":
    default:
      return "Acquire";
  }
}
