import "../styles/styles.scss";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";
import Nav from "../components/Nav/Nav";
import Aos from "aos";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <MoralisProvider
        appId={process.env.NEXT_PUBLIC_APP_ID}
        serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
      >
        <Nav />
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
}

export default MyApp;
