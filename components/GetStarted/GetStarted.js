import React from "react";
import styles from "./getstarted.module.scss";
import { BsArrowRight, BsArrowDown, BsFillEyeFill } from "react-icons/bs";
import { FaCoins } from "react-icons/fa";
import { IoIosWallet } from "react-icons/io";

function GetStarted() {
  return (
    <div className={styles.container} id="cta">
      <div
        className={styles.title}
        data-aos="fade"
        data-aos-offset="-200"
        data-aos-delay="50"
      >
        A few steps and thats it. 🔥
      </div>

      <div className={styles.steps}>
        <div
          className={styles.step}
          data-aos="fade"
          data-aos-offset="-200"
          data-aos-delay="100"
        >
          <IoIosWallet />
          <h1>
            Connect a <img src="/metamask.svg" />
            Metamask wallet
          </h1>
        </div>
        <div className={styles.arrow}>
          <BsArrowRight
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="200"
          />
        </div>
        <div className={styles.mobileArrow}>
          <BsArrowDown
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="200"
          />
        </div>
        <div
          className={styles.step}
          data-aos="fade"
          data-aos-offset="-200"
          data-aos-delay="300"
        >
          <FaCoins />
          <h1>Add a cryptocurrency to your watchlist</h1>
        </div>
        <div className={styles.arrow}>
          <BsArrowRight
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="400"
          />
        </div>
        <div className={styles.mobileArrow}>
          <BsArrowDown
            data-aos="fade"
            data-aos-offset="-200"
            data-aos-delay="400"
          />
        </div>
        <div
          className={styles.step}
          data-aos="fade"
          data-aos-offset="-200"
          data-aos-delay="500"
        >
          <BsFillEyeFill />
          <h1>Look for your cryptocurrencies</h1>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
