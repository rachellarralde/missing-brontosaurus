export const isDevelopment = () => process.env.NODE_ENV === "development";

export const getTurnstileKeyDemoSubmissions = () => process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY_DEMO_SUBMISSIONS;
export const getTurnstileSecretDemoSubmissions = () => process.env.TUNRSTILE_SECRET_DEMO_SUBMISSIONS;

export const getShowSubmissionsInNav = () => false;
