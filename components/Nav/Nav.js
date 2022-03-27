import { useMoralis } from "react-moralis";
import styles from "./nav.module.scss";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";

function Nav() {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

  const handleLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is required to use the login feature");
    } else {
      await authenticate();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href="/">
          <h1 data-aos="fade" data-aos-offset="-200" data-aos-delay="100">
            🏝️TrackBay.
          </h1>
        </Link>
      </div>
      <div className={styles.menuWrap}>
        {isAuthenticated ? (
          <div className={styles.menu}>
            {/* <h1>{user.get("username")}</h1> */}
            <Link href="/watch-list">
              <button
                className=""
                data-aos="fade"
                data-aos-offset="-200"
                data-aos-delay="200"
              >
                <AiFillEye />
                Watchlist
              </button>
            </Link>
            <button
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="300"
              onClick={() => logout()}
            >
              <IoLogOut />
              Sign out
            </button>
          </div>
        ) : (
          <div className={styles.menu}>
            <button
              onClick={handleLogin}
              data-aos="fade"
              data-aos-offset="-200"
              data-aos-delay="100"
            >
              <img src="/metamask.svg" />
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
