import ReleaseCard from "@/components/fragments/ReleaseCard";
import { makePageMetadata } from "@/lib/strings";
import { sanityFetch } from "@/sanity/live";
import { fetchSingleRelease, makeLocalReleaseInfo } from "@/sanity/releases";

export const metadata = makePageMetadata('Releases');

export default async function ReleaseSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const release = await fetchSingleRelease(params);
  const info = makeLocalReleaseInfo(release);

  return (
    <div className="flex flex-col items-center justify-center">
      <ReleaseCard info={info} key={info.title} />
    </div>
  )
} 