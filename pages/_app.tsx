import { useSession, SessionProvider, signIn } from "next-auth/react";
import { FC, useEffect } from "react";
import Head from "next/head";
import { CustomAppProps } from "types";

import "styles/globals.css";

const App: FC<CustomAppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth isAdmin={Component.isAdmin}>{getLayout(<Component {...pageProps} />)}</Auth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </SessionProvider>
    </>
  );
};

interface Props {
  isAdmin: boolean;
}

const Auth: FC<Props> = ({ children, isAdmin }) => {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status !== "loading" && !isUser) signIn();
    if (status === "loading" || !isUser) return;
    if (isAdmin && session.user.role !== "Admin") signIn();
  }, [isUser, status]);

  if (isUser) {
    return <>{children}</>;
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        placeItems: "center",
      }}
    >
      Loading...
    </div>
  );
};

export default App;
