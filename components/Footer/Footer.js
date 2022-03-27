import React from "react";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <a href="#" data-aos="fade" data-aos-offset="-200" data-aos-delay="100">
          FAQ
        </a>
        <a href="#" data-aos="fade" data-aos-offset="-200" data-aos-delay="200">
          Privacy Policy
        </a>
        <a href="#" data-aos="fade" data-aos-offset="-200" data-aos-delay="300">
          Terms of Service
        </a>
      </div>
      <div className={styles.copyright}>
        <p>© Copyright 2022 🏝️TrackBay, All rights reserved.</p>

        <p>
          Built by{" "}
          <a
            href="https://dimaodin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dima Odintsov.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
