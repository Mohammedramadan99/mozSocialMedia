import "../styles/global.css";
import "../styles/bootstrap.min.css";
import Layout from "../components/Layout/Layout";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }) => {
  
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(App);
// ramadanmohammed502@gmail.com
