import { useEffect, useState } from "react";
import { MENU_API_URL } from "./constants";
import { useSelector } from "react-redux";
import { API_ENDPOINT } from "./constants";

const useRestaurantMenu = (resId) => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      API_ENDPOINT +
        "/api/fetch-menu?url=" +
        MENU_API_URL +
        latitude +
        "&lng=" +
        longitude +
        "&restaurantId=" +
        resId
    );
    const json = await data.json();
    setResInfo(json.data);
  };
  return resInfo;
};

export default useRestaurantMenu;
