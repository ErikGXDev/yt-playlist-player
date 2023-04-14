import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./Layout";

import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider
      session={session}
      basePath="/api/auth"
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Disable Re-fetches session when window is focused
      refetchOnWindowFocus={false}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
