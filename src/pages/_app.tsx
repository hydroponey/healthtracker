import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";

import { ThemeProvider } from "@material-tailwind/react";
import Layout from "@/components/layout"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
