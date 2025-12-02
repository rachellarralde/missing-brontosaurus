'use client'

import { getLogoSizeScaled } from '@/components/Logo';
import { bodyColumnClasses } from '@/lib/styles';
import { getTurnstileKeyDemoSubmissions, isDevelopment } from '@/lib/environment';
import Turnstile from "react-turnstile";

const kSiteKey = isDevelopment() ? "1x00000000000000000000AA" : getTurnstileKeyDemoSubmissions();

export default function SubmissionsPage() {
    const { width: logoWidth, height: logoHeight } = getLogoSizeScaled();

    const handleVerify = (token: string) => {
        window.location.href = `/api/v1/submissions?token=${token}`;
    }

    if (kSiteKey === undefined) {
        return (<span>this is bad. sorry.</span>);
    }

    return (<div className={bodyColumnClasses + " w-full"}>
        <div>One moment........</div>
        <div>
            <Turnstile sitekey={kSiteKey}
                onVerify={handleVerify}
                theme="dark" />
        </div>
        <div>
            <img
                src="/logos/tight-crop.png"
                alt="A brontosaurus with a bold question mark"
                width={logoWidth}
                height={logoHeight}
            />
        </div>

    </div>);
}
