import ReleaseCard from "@/components/fragments/ReleaseCard";
import { sanityFetch } from "@/sanity/live";
import { makeLocalReleaseInfo, SINGLE_RELEASE_QUERY } from "@/sanity/releases";

export default async function ReleaseSinglePage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {

    const { data: releases } = await sanityFetch({ query: SINGLE_RELEASE_QUERY, params: await params });

    return (
        <div className="flex flex-col items-center justify-center">
            {
              // TD
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              releases.map((release: any) => {
                const info = makeLocalReleaseInfo(release);
                return <ReleaseCard info={info} key={info.title}/>;
              })
            }
        </div>
    )
  } 