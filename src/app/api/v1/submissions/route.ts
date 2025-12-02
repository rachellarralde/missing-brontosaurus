'use server'

import { redirect } from 'next/navigation'
import { fetchSubmissionSettingsForBackend } from '@/sanity/submissionSettings';
import { getTurnstileSecretDemoSubmissions, isDevelopment } from '@/lib/environment';

const kTurnstileSecret = isDevelopment() ? "1x0000000000000000000000000000000AA" : getTurnstileSecretDemoSubmissions();

interface TurnstileResponse {
    "error-codes"?: string[];
    success: boolean;
    messages?: string[];
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return new Response('Token is required', { status: 400 });
    }

    const { enabled, formUrl } = await fetchSubmissionSettingsForBackend();

    if (!enabled) {
        redirect("/submissions");
        return;
    }

    const verifyBody = {
        secret: kTurnstileSecret,
        response: token,
    }
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(verifyBody),
    });
    const data = await response.json() as TurnstileResponse;

    if (data.success) {
        redirect(formUrl);
    } else {
        redirect("/");
    }
}
