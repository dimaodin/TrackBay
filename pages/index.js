import Head from "next/head";
import styles from "./index.module.scss";
import PriceCard from "../components/PriceCard/PriceCard";
import Hero from "../components/Hero/Hero";
import MarketHeader from "../components/MarketHeader/MarketHeader";
import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
import { useState, useRef } from "react";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.coingecko.com/api/v3/coins`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
export default function Home({ data }) {
  const [currData, setCurrData] = useState(data.slice(0, 10));
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  function loadMore() {
    if (currData.length < data.length) {
      setCurrData(data);
      executeScroll();
    } else {
      setCurrData(data.slice(0, 10));
      executeScroll();
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>🏝️TrackBay</title>
      </Head>
      <Hero />
      <GetStarted />
      <div className={styles.wrapper}>
        <div className={styles.cards} ref={myRef}>
          <MarketHeader />
          {currData &&
            currData.map((coin) => <PriceCard coinData={coin} key={coin.id} />)}
        </div>
        <div className={styles.buttonWrap}>
          <button onClick={loadMore}>
            {currData.length < data.length ? "Load more" : "Show less"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
