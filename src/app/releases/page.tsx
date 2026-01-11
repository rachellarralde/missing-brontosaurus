import ReleaseCard from "@/components/fragments/ReleaseCard";
import { makePageMetadata } from "@/lib/strings";
import { fetchReleasedReleases, makeLocalReleaseInfo } from "@/sanity/releases";

export const metadata = makePageMetadata('Releases');

export default async function ReleasesPage() {

  const releases = await fetchReleasedReleases();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {
        releases.map((release) => {
          const info = makeLocalReleaseInfo(release);
          return <ReleaseCard info={info} key={info.title} />;
        })
      }
    </div>
  )
} 