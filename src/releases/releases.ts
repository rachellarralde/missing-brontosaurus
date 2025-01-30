export interface ReleaseInfo {
    artist: string;
    title: string;
    path: string;
    bandcampEmbed?: string;
    buyLink?: string;
    streamLink?: string;
}

const bandcampPlayerWidth = 420;
const bandcampPlayerHeight = 512;
// bandcamp THEME = BLACK, LINKS = GREEN

export const naiadWyvern: ReleaseInfo = {
    artist: "NAIAD",
    title: "Wyvern",
    path: "naiad/wyvern",
    bandcampEmbed: `<iframe style="border: 0; width: ${bandcampPlayerWidth}px; height: ${bandcampPlayerHeight}px;" src="https://bandcamp.com/EmbeddedPlayer/track=3507047640/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless><a href="https://mynameisnaiad.bandcamp.com/track/wyvern">Wyvern by NAIAD</a></iframe>`,
    buyLink: "https://mynameisnaiad.bandcamp.com/track/wyvern",
    streamLink: "https://ditto.fm/wyvern",
}

export const naiadAnaconda: ReleaseInfo = {
    artist: "NAIAD",
    title: "Anaconda",
    path: "naiad/anaconda",
    bandcampEmbed: `<iframe style="border: 0; width: ${bandcampPlayerWidth}px; height: ${bandcampPlayerHeight}px;" src="https://bandcamp.com/EmbeddedPlayer/track=234200418/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless><a href="https://mynameisnaiad.bandcamp.com/track/anaconda">Anaconda by NAIAD</a></iframe>`,
    buyLink: "https://mynameisnaiad.bandcamp.com/track/anaconda",
    streamLink: "https://ditto.fm/anaconda-naiad"
}

export const naiadOnyx: ReleaseInfo = {
    artist: "NAIAD",
    title: "Onyx",
    path: "naiad/onyx",
    bandcampEmbed: `<iframe style="border: 0; width: ${bandcampPlayerWidth}px; height: ${bandcampPlayerHeight}px;" src="https://bandcamp.com/EmbeddedPlayer/track=1420291559/size=large/bgcol=333333/linkcol=2ebd35/tracklist=false/transparent=true/" seamless><a href="https://mynameisnaiad.bandcamp.com/track/onyx">Onyx by NAIAD</a></iframe>`,
    buyLink: "https://mynameisnaiad.bandcamp.com/track/onyx",
    streamLink: "https://ditto.fm/onyx-naiad"
}

/** alias to the latest release */
export const latestRelease = naiadOnyx;
/** a list of all releaeses, in reverse chronological order, KD */
export const allReleases: ReleaseInfo[] = [naiadOnyx, naiadAnaconda, naiadWyvern];
