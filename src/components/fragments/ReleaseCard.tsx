import { bandcampPlayerWidth, isReleaseSingle, ReleaseInfo } from "@/releases/releases";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image"
import BandcampEmbed from "./BandcampEmbed";
import { isBandcampEmbedUrlValid } from "@/sanity/releases";

interface ReleaseCardProps {
    info: ReleaseInfo;
}

export default function ReleaseCard({ info }: ReleaseCardProps) {

    const bigCard = (()=>
    {
        if(isBandcampEmbedUrlValid(info)) {
            return <BandcampEmbed embedUrl={info.bandcampEmbedUrl??""} isAlbum={!isReleaseSingle(info)} />;
        } else {
            const releaseImage = `/releases/${info.slug}.jpg`
            return <Image width={bandcampPlayerWidth} height={bandcampPlayerWidth} src={releaseImage} alt={info.title} />;
        }
    })();

    const isPreOrder =  info.releaseDate !== undefined ? info.releaseDate > new Date() : false;
    const buyText = isPreOrder ? "Pre Order" : "Buy";
    const streamText = isPreOrder ? "Pre Save" : "Stream";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-sans">{info.artist} - {info.title}</h2>
            <div className="justify-center">
                <div className="m-2">
                    {bigCard}
                </div>
                <div className="grid grid-cols-2 gap-2 m-2 justify-center">
                    <Button><Link href={info.buyLink ?? ""} target="_blank" className="text-lg w-full">{buyText}</Link></Button>
                    <Button><Link href={info.streamLink ?? ""} target="_blank" className="text-lg w-full">{streamText}</Link></Button>
                </div>
            </div>
        </div>
    );
}
