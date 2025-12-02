import { getLogoSizeScaled } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { fetchSubmissionSettingsForFrontend } from '@/sanity/submissionSettings';
import Image from 'next/image';
import Link from 'next/link';
import { bodyColumnClasses } from '@/lib/styles'
import { makePageMetadata } from '@/lib/strings';

export const metadata = makePageMetadata('Submissions');

export default async function SubmissionsPage() {

    const status = await fetchSubmissionSettingsForFrontend();

    const { width: logoWidth, height: logoHeight } = getLogoSizeScaled();

    return (
        <div className={bodyColumnClasses + " w-full"}>
            <div className="text-2xl font-sans">{status.enabled ? status.activeMessage : status.awayMessage}</div>
            <div className="m-8">
                {status.enabled && <Button className="text-2xl"><Link href="/submissions/start" target="_blank">Demo Submission Form</Link></Button>}
            </div>
            <div>
                <Image src="/logos/tight-crop.png" alt="a missing brontosarus" width={logoWidth} height={logoHeight} />
            </div>
        </div>
    )
}
