import ReleaseCard from "@/components/fragments/ReleaseCard";
import { sanityFetch } from "@/sanity/live";
import { makeLocalReleaseInfo, RELEASED_RELEASES_QUERY } from "@/sanity/releases";
import { defineQuery } from "next-sanity";

export default async function ReleasesPage() {

    const { data: releases } = await sanityFetch({ query: RELEASED_RELEASES_QUERY });

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            {releases.map((release: any) => {
                const info = makeLocalReleaseInfo(release);
            return <ReleaseCard info={info} key={info.title}/>;
            })}
        </div>
    )
  } 