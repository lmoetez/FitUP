import type { NextPage } from "next";
import type { AppProps } from "next/app";

export type CustomNextPage<P = {}> = NextPage<P> & {
  isAdmin?: boolean;
  auth?: boolean;
  getLayout?: (page: ReactElement) => ReactNode;
};

export type CustomAppProps = AppProps & {
  Component: CustomNextPage;
};

export type CustomNextRequest = NextApiRequest & {
  file?: any;
};
