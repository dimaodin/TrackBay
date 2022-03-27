import React from "react";
import styles from "./marketheader.module.scss";

function MarketHeader() {
  return (
    <div className={styles.container}>
      <h1
        className={styles.cryptoText}
        data-aos="fade"
        data-aos-offset="-200"
        data-aos-delay="100"
      >
        Crypto
      </h1>
      <h1
        className={styles.priceText}
        data-aos="fade"
        data-aos-offset="-200"
        data-aos-delay="200"
      >
        Price
      </h1>
      <h1
        className={styles.changeText}
        data-aos="fade"
        data-aos-offset="-200"
        data-aos-delay="300"
      >
        24H Change
      </h1>
    </div>
  );
}

export default MarketHeader;
