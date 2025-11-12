'use server'
 
import { redirect } from 'next/navigation'

interface TurnstileResponse {
    "error-codes"?: string[];
    success: boolean;
    messages?: string[];
}

const kTurnstileSecret = "sup";
const kRedirectUrl = "https://forms.gle/41Taz7y4JnCRWBgdA";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return new Response('Token is required', { status: 400 });
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ token }),
    });
    const data = await response.json() as TurnstileResponse;

    if (data.success) {
        redirect(kRedirectUrl);
    } else {
        redirect("/");
    }
}
