import "../styles/global.css";
import "../styles/bootstrap.min.css";
import Layout from "../components/Layout/Layout";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }) => {
  const Loading = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      const handleStart = (url) => url !== router.asPath && setLoading(ture);
      const handleComplete = (url) =>
        url === router.asPath && setLoading(false);

      router.events.on("routerChangeStart", handleStart);
      router.events.on("routerChangeComplete", handleComplete);
      router.events.on("routerchangeError", handleComplete);

      return () => {
        router.events.off("routerChangeStart", handleStart);
        router.events.off("routerChangeComplete", handleComplete);
        router.events.off("routerchangeError", handleComplete);
      };
    });
    return loading && <div>loading</div>;
  };
  return (
    <>
      <Loading />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(App);
// ramadanmohammed502@gmail.com
