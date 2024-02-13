/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../context/CityProvider";
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
// eslint-disable-next-line react/prop-types
export default function CityItem({ citie }) {
  // console.log(citie)
  const { currentCity, deleteCity } = useCities();
  const { position, id } = citie;

  // console.log(position);
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? "cityItem--active" : ""
        }`}
        to={`${citie.id}?Lat=${position.lat}&Lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(citie.emoji)}</span>
        <h3 className={styles.name}>{citie.cityName}</h3>
        <time className={styles.date}>{formatDate(citie.date)}</time>
        <button onClick={handleClick} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
