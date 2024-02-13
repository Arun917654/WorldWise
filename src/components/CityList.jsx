/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../context/CityProvider";
export default function CityList() {
  const { cities, loading } = useCities();
  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((citie) => (
        <CityItem key={citie.id} citie={citie} />
      ))}
    </ul>
  );
}
