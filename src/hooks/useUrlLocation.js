import { useSearchParams } from "react-router-dom";

export default function useUrlLocation() {
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("Lat");
  const lng = searchParam.get("Lng");
  // console.log(lat ,"usee geo
  return [lat, lng];
}
