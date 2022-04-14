import React from "react";
import styles from "./hero.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Hero() {
  return (
    <div className={styles.container}>
      <div
        className={styles.ethereum}
        data-aos="fade"
        data-aos-offset="-200"
        data-aos-delay="100"
      >
        <LazyLoadImage
          alt="ethereum"
          src="./coins.png"
          effect="blur"
          delayTime={300}
        />
      </div>
      <div className={styles.heroText}>
        <h2 data-aos="fade" data-aos-offset="-200" data-aos-delay="300">
          Crypto tracker on STEROIDS 🏋️
        </h2>
        <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="200">
          🏝️TrackBay
        </h1>

        <h3 data-aos="fade" data-aos-offset="-200" data-aos-delay="400">
          Easily track cryptocurrencies in one place, with your Metamask wallet.
        </h3>
        <a href="#cta">
          <button data-aos="fade" data-aos-offset="-200" data-aos-delay="500">
            START TRACKING &nbsp;🔎
          </button>
        </a>
      </div>
    </div>
  );
}

export default Hero;
