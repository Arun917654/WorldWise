import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../context/CityProvider";


export default function CountryList() {
  const { cities, loading } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );

  const Countries = cities.reduce((arr, city) => {
    const isCountryIncluded = arr.some((el) => el.country === city.country);

    if (!isCountryIncluded) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  //   console.log(Countries);
  return (
    <ul className={styles.countryList}>
      {Countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}
