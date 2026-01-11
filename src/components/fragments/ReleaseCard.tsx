import { bandcampPlayerWidth, isReleaseSingle, ReleaseInfo } from "@/releases/releases";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image"
import BandcampEmbed from "./BandcampEmbed";
import { getLinkText, isBandcampEmbedUrlValid } from "@/sanity/releases";

interface ReleaseCardProps {
    info: ReleaseInfo;
}

export default function ReleaseCard({ info }: ReleaseCardProps) {

    const bigCard = (() => {
        if (isBandcampEmbedUrlValid(info)) {
            return <BandcampEmbed embedUrl={info.bandcampEmbedUrl ?? ""} isAlbum={!isReleaseSingle(info)} />;
        } else {
            const releaseImage = `/releases/${info.slug}.jpg`
            return <Image width={bandcampPlayerWidth} height={bandcampPlayerWidth} src={releaseImage} alt={info.title} />;
        }
    })();

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-sans">{info.artist} - {info.title}</h2>
            <div className="justify-center">
                <div className="m-2">
                    {bigCard}
                </div>
                <div className="grid grid-cols-2 gap-2 m-2 justify-center">
                    {info.links.map((link, index) => {
                        const len = info.links.length;
                        const lastIsOdd = len % 2 !== 0;
                        const spanClass = lastIsOdd && index === len - 1 ? "col-span-2" : "";
                        return <Button key={link.linkType ?? "" + link.url} className={spanClass} ><Link href={link.url ?? ""} target="_blank" className="text-lg w-full">{getLinkText(info, link)}</Link></Button>;
                    })}
                </div>
            </div>
        </div>
    );
}
