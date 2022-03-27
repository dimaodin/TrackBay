import "../styles/styles.scss";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";
import Nav from "../components/Nav/Nav";
import Aos from "aos";
import "aos/dist/aos.css";

const appId = "orHJtxnGnY74iB1GSiDdzmCPsgyvBOJs2Nl3mRAm";
const serverUrl = "https://tssujh5928ml.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <MoralisProvider appId={appId} serverUrl={serverUrl}>
        <Nav />
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
