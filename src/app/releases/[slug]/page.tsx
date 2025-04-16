import ReleaseCard from "@/components/fragments/ReleaseCard";
import { ReleaseInfo } from "@/releases/releases";
import { sanityFetch } from "@/sanity/live";
import { makeLocalReleaseInfo, SINGLE_RELEASE_QUERY } from "@/sanity/releases";
import { defineQuery } from "next-sanity";


export default async function ReleaseSinglePage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {

    const { data: releases } = await sanityFetch({ query: SINGLE_RELEASE_QUERY, params: await params });

    return (
        <div className="flex flex-col items-center justify-center">
            {releases.map((release: any) => {
                const info = makeLocalReleaseInfo(release);
            return <ReleaseCard info={info} key={info.title}/>;
            })}
        </div>
    )
  } 