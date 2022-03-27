import Nav from "../components/Nav/Nav";
import { useState, useEffect } from "react";
import styles from "./coin.module.scss";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import millify from "millify";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useMoralis } from "react-moralis";
import Footer from "../components/Footer/Footer";
import PeriodSelector from "../components/PeriodSelector";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { coinid } = context.query;
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinid}`);
  const data = await res.json();
  // const market = await fetch(
  //   `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=3`
  // );
  // const marketData = await market.json();

  return { props: { data } };
}

function Coinid({ data }) {
  const router = useRouter();
  const { coinid } = router.query;
  const { isAuthenticated, user, Moralis } = useMoralis();
  const [inputValue, setInputValue] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [currencyRate, setCurrencyRate] = useState(
    data.market_data.current_price.usd
  );
  const [rise, setRise] = useState(data.market_data.price_change_24h > 0);
  const [weekrise, setWeekRise] = useState(
    data.market_data.price_change_7d > 0
  );
  const [coinExists, setCoinExists] = useState(false);
  const [period, setPeriod] = useState(3);
  const [chartData, setChartData] = useState();
  const WatchList = Moralis.Object.extend("WatchList");

  useEffect(() => {
    if (user) {
      checkIfExists();
    } else {
      console.log("not logged in");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getChartData();
  }, [period]);
  function handleValueChange(e) {
    setInputValue(e.target.value);
    setConvertedValue((e.target.value * currencyRate).toFixed(2));
  }
  function handleConvertedValueChange(e) {
    setConvertedValue(e.target.value);
    setInputValue((e.target.value / currencyRate).toFixed(2));
  }
  function handleCurrencyChange(e) {
    setCurrencyRate(data.market_data.current_price[e.target.value]);
    setConvertedValue(
      inputValue * data.market_data.current_price[e.target.value]
    );
  }
  async function checkIfExists() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    if (userWatchList.length > 0) {
      const watchList = userWatchList[0];
      const coins = watchList.get("coins");
      if (coins.includes(data.id)) {
        setCoinExists(true);
      }
    } else {
      const watchList = new WatchList();
      watchList.set("user", userid);
      watchList.set("coins", []);
      await watchList.save();
    }
  }
  async function addToWatch() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    if (prev) {
      userWatchList[0].set("coins", [...prev, data.id]);
    } else {
      userWatchList[0].set("coins", [data.id]);
    }
    userWatchList[0].save().then(() => {
      console.log("saved");
      setCoinExists(true);
    });
  }
  async function removeFromWatch() {
    const userid = await user.get("ethAddress");
    const query = new Moralis.Query(WatchList);
    query.equalTo("user", userid);
    const userWatchList = await query.find();
    const prev = userWatchList[0].get("coins");
    const filtered = prev.filter((coin) => coin !== data.id);
    userWatchList[0].set("coins", filtered);
    userWatchList[0].save().then(() => {
      console.log("saved");
      setCoinExists(false);
    });
  }
  async function getChartData() {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart?vs_currency=usd&days=${period}`
    );
    const data = await res.json();
    setChartData(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>🏝️TrackBay | {data.name}</title>
      </Head>
      <div className={styles.wrap}>
        <div className={styles.nameContainer}>
          <div className={styles.name}>
            <img
              src={data.image.large}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="100"
            />
            <div className={styles.title}>
              <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="200">
                {data.name}
              </h1>
              <h2 data-aos="fade" data-aos-offset="-200" data-aos-delay="300">
                {data.symbol}
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.dailyChanges}>
          <div className={styles.dailyChangesText}>
            <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="100">
              ${data.market_data.current_price.usd}
            </h1>
            <h2
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="200"
              className={` ${rise ? styles.green : styles.red}  `}
            >
              ⥮ {data.market_data.price_change_percentage_24h.toFixed(3)}%
            </h2>
          </div>
          <div>
            {isAuthenticated && !coinExists && (
              <button
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="300"
                onClick={addToWatch}
              >
                <AiOutlineStar />
                Watchlist
              </button>
            )}
            {isAuthenticated && coinExists && (
              <button
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="300"
                onClick={removeFromWatch}
              >
                <AiFillStar />
                Watchlist
              </button>
            )}
          </div>
        </div>
        <div className={styles.dataContainer}>
          <div className={styles.chartContainer}>
            <div className={styles.periods}>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="100"
              >
                <PeriodSelector
                  value={1}
                  period={period}
                  onChange={() => setPeriod(1)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="150"
              >
                <PeriodSelector
                  value={3}
                  period={period}
                  onChange={() => setPeriod(3)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="200"
              >
                <PeriodSelector
                  value={7}
                  period={period}
                  onChange={() => setPeriod(7)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="250"
              >
                <PeriodSelector
                  value={14}
                  period={period}
                  onChange={() => setPeriod(14)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="300"
              >
                <PeriodSelector
                  value={30}
                  period={period}
                  onChange={() => setPeriod(30)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="350"
              >
                <PeriodSelector
                  value={90}
                  period={period}
                  onChange={() => setPeriod(90)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="400"
              >
                <PeriodSelector
                  value={180}
                  period={period}
                  onChange={() => setPeriod(180)}
                />
              </div>
              <div
                className={styles.period}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="450"
              >
                <PeriodSelector
                  value={365}
                  period={period}
                  onChange={() => setPeriod(365)}
                />
              </div>
            </div>
            {chartData && (
              <Line
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="400"
                className={styles.chart}
                data={{
                  labels: [...Array(50).keys()],
                  datasets: [
                    {
                      label: "Price",
                      data: chartData.prices.map((price) => price[1]),
                      tension: 0.5,
                      borderColor: `${rise ? "#16a34a" : "#dc2626"}`,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            )}
          </div>
          <div
            className={styles.changes}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="500"
          >
            <h1
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="100"
              className={styles.changesTitle}
            >
              Changes 💸
            </h1>
            <div className={styles.duration}>
              <div
                className={styles.singleDuration}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="200"
              >
                <h1>1 Day</h1>
                <h1>{data.market_data.price_change_percentage_24h}%</h1>
              </div>
              <div
                className={styles.singleDuration}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="300"
              >
                <h1>7 Days</h1>
                <h1>{data.market_data.price_change_percentage_7d}%</h1>
              </div>
              <div
                className={styles.singleDuration}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="400"
              >
                <h1>1 Month</h1>
                <h1>{data.market_data.price_change_percentage_30d}%</h1>
              </div>
              <div
                className={styles.singleDuration}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="500"
              >
                <h1>1 Year</h1>
                <h1>{data.market_data.price_change_percentage_1y}%</h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.statsContainer}
          data-aos="fade"
          data-aos-offset="-200"
          data-aos-delay="100"
        >
          <h1
            className={styles.statsTitle}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="200"
          >
            Stats 📈
          </h1>
          <div className={styles.stats}>
            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="300"
            >
              <h1 className={styles.statText}>24h High</h1>
              <h1 className={styles.statData}>
                ${data.market_data.high_24h.usd}
              </h1>
            </div>
            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="400"
            >
              <h1 className={styles.statText}>24h Low</h1>
              <h1 className={styles.statData}>
                ${data.market_data.low_24h.usd}
              </h1>
            </div>
            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="500"
            >
              <h1 className={styles.statText}>Market Cap</h1>
              <h1 className={styles.statData}>
                ${millify(data.market_data.market_cap.usd)}
              </h1>
            </div>
            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="600"
            >
              <h1 className={styles.statText}>Market Cap Rank</h1>
              <h1 className={styles.statData}>
                #{millify(data.market_data.market_cap_rank)}
              </h1>
            </div>
            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="700"
            >
              <h1 className={styles.statText}>Total Volume</h1>
              <h1 className={styles.statData}>
                ${millify(data.market_data.total_volume.usd)}
              </h1>
            </div>
            {data.market_data.fully_diluted_valuation.usd && (
              <div
                className={styles.singleStat}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="800"
              >
                <h1 className={styles.statText}>Fully Diluted Valuation</h1>
                <h1 className={styles.statData}>
                  ${millify(data.market_data.fully_diluted_valuation.usd)}
                </h1>
              </div>
            )}

            {data.market_data.total_supply && (
              <div
                className={styles.singleStat}
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="900"
              >
                <h1 className={styles.statText}>Total Supply</h1>
                <h1 className={styles.statData}>
                  ${millify(data.market_data.total_supply)}
                </h1>
              </div>
            )}

            <div
              className={styles.singleStat}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="1000"
            >
              <h1 className={styles.statText}>Circulating Supply</h1>
              <h1 className={styles.statData}>
                ${millify(data.market_data.circulating_supply)}
              </h1>
            </div>
          </div>
        </div>

        <div
          className={styles.converter}
          data-aos="fade"
          data-aos-offset="-200"
          data-aos-delay="700"
        >
          <h1
            className={styles.converterTitle}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="800"
          >
            Currency Converter 💶💷
          </h1>
          <form>
            <div
              className={styles.formStyling}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="900"
            >
              <h1>{data.symbol}</h1>
              <input onChange={handleValueChange} value={inputValue} />
            </div>
            <RiArrowLeftRightFill
              className={styles.arrow}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="1000"
            />
            <div
              className={styles.fiatChoose}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="1100"
            >
              <select onChange={handleCurrencyChange}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="ils">ILS</option>
                <option value="aud">AUD</option>
                <option value="cad">CAD</option>
                <option value="hkd">HKD</option>
                <option value="rub">RUB</option>
              </select>

              <input
                onChange={handleConvertedValueChange}
                value={convertedValue}
              />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Coinid;
