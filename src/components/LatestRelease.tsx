import { naiadWyvern } from "@/releases/releases";
import ReleaseCard from "./fragments/ReleaseCard";

export default function LatestRelease() {
    return (
        <div className="">
            <h1 className="text-4xl font-bold text-center">Latest Release</h1>
            <ReleaseCard info={naiadWyvern} />
        </div>
    );
}
