import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import styles from "./watchlist.module.scss";
import PriceCard from "../components/PriceCard/PriceCard";
import MarketHeader from "../components/MarketHeader/MarketHeader";
import Footer from "../components/Footer/Footer";

export async function getServerSideProps() {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins`);
  const data = await res.json();

  return { props: { data } };
}
function WatchList({ data }) {
  const { isAuthenticated, user, Moralis } = useMoralis();
  const [watchList, setWatchList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const WatchList = Moralis.Object.extend("WatchList");
  useEffect(() => {
    if (isAuthenticated) {
      getWatchList();
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const newData = data.filter((coin) => {
      return watchList.includes(coin.id);
    });
    setFilteredData(newData);
  }, [watchList]);
  async function getWatchList() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    setWatchList(prev);
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.title}>
          <h1>My Watchlist </h1>
          <h2 className={styles.eyes}>👀</h2>
        </div>
        {filteredData && <MarketHeader />}
        {filteredData &&
          filteredData.map((coin) => (
            <PriceCard coinData={coin} key={coin.id} />
          ))}
        {!isAuthenticated && (
          <h1 className={styles.please}>Please log in 🎉</h1>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default WatchList;
