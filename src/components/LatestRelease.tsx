import { getLatestRelease } from "@/releases/releases";
import ReleaseCard from "./fragments/ReleaseCard";
import TitledCard from "./fragments/TitledCard";

export default function LatestRelease() {
    return (
        <TitledCard title="Latest Release">
            <ReleaseCard info={getLatestRelease()} />
        </TitledCard>
    );
}
