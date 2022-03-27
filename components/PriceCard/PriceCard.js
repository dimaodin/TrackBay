import { useState } from "react";
import styles from "./pricecard.module.scss";
import Link from "next/link";

function PriceCard({ coinData }) {
  const [rise, setRise] = useState(coinData.market_data.price_change_24h > 0);
  return (
    <div className={styles.container}>
      <div className={styles.coinNameFixer}>
        <div className={styles.coinNameWrap}>
          <img
            src={coinData.image.small}
            alt={coinData.id}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="100"
          />
          <Link href={`/${coinData.id}`}>
            <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="200">
              {coinData.name}
            </h1>
          </Link>
        </div>
      </div>
      <div className={styles.coinPrice}>
        <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="300">
          ${coinData.market_data.current_price.usd}
        </h1>
      </div>
      <div className={styles.coinChange}>
        {coinData.market_data.price_change_24h > 0 ? (
          <h1
            className={styles.green}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="400"
          >
            {coinData.market_data.price_change_percentage_24h.toFixed(3)}%
          </h1>
        ) : (
          <h1
            className={styles.red}
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="400"
          >
            {coinData.market_data.price_change_percentage_24h.toFixed(3)}%
          </h1>
        )}
      </div>
    </div>
  );
}

export default PriceCard;
