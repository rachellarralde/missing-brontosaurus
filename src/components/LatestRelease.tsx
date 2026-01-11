import ReleaseCard from "./fragments/ReleaseCard";
import TitledCard from "./fragments/TitledCard";
import { fetchLatestRelease, makeLocalReleaseInfo } from "@/sanity/releases";

export default async function LatestRelease() {

    const latestRelease = await fetchLatestRelease();

    return (
        <TitledCard title="Latest Release">
            <ReleaseCard info={makeLocalReleaseInfo(latestRelease)} />
        </TitledCard>
    );
}
