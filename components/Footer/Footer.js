import React from "react";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <div className={styles.container}>
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
