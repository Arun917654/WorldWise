import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:9000";
const CityContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };

    case "cities/loaded":
      return {
        ...state,
        loading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, loading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};
// eslint-disable-next-line react/prop-types
function CityProvider({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function FetchData() {
      try {
        dispatch({ type: "loading" });
        let res = await fetch(`${BASE_URL}/cities`);
        let data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    FetchData();
  }, []);
  async function createCity(newCity) {
    let res = await fetch("http://localhost:3000/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    });
    let data = await res.json();
    dispatch({ type: "city/created", payload: data });
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }
  const getCitie = useCallback(
    async function getCitie(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });

      try {
        let res = await fetch(`${BASE_URL}/cities/${id}`);
        let data = await res.json();
        dispatch({ type: "city/loaded", payload: data });

        //   console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    [currentCity.id]
  );

  return (
    <CityContext.Provider
      value={{ createCity, deleteCity, cities, loading, getCitie, currentCity }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CityProvider, useCities };
