import Script from "next/script";
import { Fragment } from "react";

export default function SimpleAnalytics() {
    return (
        <Fragment>
            <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
            <Script src="https://scripts.simpleanalyticscdn.com/auto-events.js" />
        </Fragment>
    );
}
