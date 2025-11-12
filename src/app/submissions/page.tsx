'use client'

import { isDevelopment } from '@/lib/utils';
import Turnstile, { useTurnstile } from "react-turnstile";


const kSiteKey = isDevelopment() ? "1x00000000000000000000AA" : "0x4AAAAAAB9qmdW2OM80tI12";

export default async function SubmissionsPage() {

    const handleVerify = (token: string) => {
        window.location.href = `/api/v1/submissions?token=${token}`;
    }

    return <div>
        <Turnstile sitekey={kSiteKey}
            onVerify={handleVerify}
            theme="dark" />
    </div>;
}
