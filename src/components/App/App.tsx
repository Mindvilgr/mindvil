import LogoImg from "@site/src/assets/logo.svg";

import Courses from "../Courses";
import styles from "./app.module.css";

export default function App() {
  return (
    <div className={styles.hero}>
      <div className={styles.logoWrapper}>
        <LogoImg />
        <h1>Made for devs by devs</h1>
      </div>
      <Courses />
    </div>
  );
}
