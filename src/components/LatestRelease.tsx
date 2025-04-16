import { getLatestRelease } from "@/releases/releases";
import ReleaseCard from "./fragments/ReleaseCard";
import TitledCard from "./fragments/TitledCard";
import { LATEST_RELEASE_QUERY, makeLocalReleaseInfo } from "@/sanity/releases";
import { sanityFetch } from "@/sanity/live";

export default async function LatestRelease() {

    const { data: latestRelease } = await sanityFetch({ query: LATEST_RELEASE_QUERY });

    return (
        <TitledCard title="Latest Release">
            <ReleaseCard info={makeLocalReleaseInfo(latestRelease)} />
        </TitledCard>
    );
}
