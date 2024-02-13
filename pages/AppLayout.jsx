import SideBar from "../src/components/SideBar";
import styles from "../pages/AppLayout.module.css";
import Map from "../src/components/Map";
import User from "../src/components/User";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
