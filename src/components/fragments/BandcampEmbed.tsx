import { bandcampAlbumPlayerHeight, bandcampPlayerHeight, bandcampPlayerWidth, ReleaseInfo } from "@/releases/releases";
import { Button } from "../ui/button";
import Link from "next/link";

interface BandcampEmbedProps {
    embedUrl: string;
    isAlbum: boolean;
}

export default function BandcampEmbed({ embedUrl, isAlbum }: BandcampEmbedProps) {
    const styleProps = {
        border: 0,
        width: `${bandcampPlayerWidth}px`,
        height: `${isAlbum ? bandcampAlbumPlayerHeight : bandcampPlayerHeight}px`
    }
    return (
        <iframe style={styleProps} src={embedUrl} seamless></iframe>
    );
}
