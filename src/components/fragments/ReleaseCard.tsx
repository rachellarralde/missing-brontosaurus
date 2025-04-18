import { isReleaseSingle, ReleaseInfo } from "@/releases/releases";
import { Button } from "../ui/button";
import Link from "next/link";
import BandcampEmbed from "./BandcampEmbed";

interface ReleaseCardProps {
    info: ReleaseInfo;
}

export default function ReleaseCard({ info }: ReleaseCardProps) {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-sans">{info.artist} - {info.title}</h2>
            <div className="justify-center">
                <div className="m-2">
                    <BandcampEmbed embedUrl={info.bandcampEmbedUrl ?? ""} isAlbum={!isReleaseSingle(info)} />
                </div>
                <div className="grid grid-cols-2 gap-2 m-2 justify-center">
                    <Button><Link href={info.buyLink ?? ""} target="_blank" className="text-lg">Buy</Link></Button>
                    <Button><Link href={info.streamLink ?? ""} target="_blank" className="text-lg">Stream</Link></Button>
                </div>
            </div>
        </div>
    );
}
