import * as Sentry from "@sentry/nextjs";

export function register() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        Sentry.init({
            dsn: "https://b40d332809294bd597bfb34869f2e343@o4505232363421696.ingest.sentry.io/4505232366764032",

            // Adjust this value in production, or use tracesSampler for greater control
            tracesSampleRate: 1,

            // Setting this option to true will print useful information to the console while you're setting up Sentry.
            debug: false,
        });
    }

    if (process.env.NEXT_RUNTIME === "edge") {
        Sentry.init({
            dsn: "https://b40d332809294bd597bfb34869f2e343@o4505232363421696.ingest.sentry.io/4505232366764032",

            tracesSampleRate: 1,

            debug: false,
        });
    }
}

export const onRequestError = Sentry.captureRequestError;
