import RestaurantCard, { offerCard } from "./RestaurantCard";
import { useState, useEffect, useCallback } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_ENDPOINT } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const { latitude, longitude, cityName } = useSelector(
    (state) => state.location
  );

  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData(latitude, longitude);
  }, [latitude, longitude]);

  const fetchData = async (latitude, longitude) => {
    const data = await fetch(
      `${API_ENDPOINT}/api/restaurants?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const jsonData = await data.json();
    const restaurants =
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];

    setRestaurantList(restaurants);
    setFilteredRestaurant(restaurants);
  };

  const handleSearch = useCallback(() => {
    const searchFilterRes = restaurantList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(searchFilterRes);
  }, [restaurantList, searchText]);

  const handleTopRatedClick = useCallback(() => {
    const filteredList = restaurantList.filter(
      (res) => res.info.avgRating > 4.5
    );
    setFilteredRestaurant(filteredList);
  }, [restaurantList]);

  const OfferCardRes = offerCard(RestaurantCard);
  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) {
    return (
      <div>
        <h1 className="online-status-text">
          You're Offline please check your internet connection
        </h1>
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="body">
      {!restaurantList ||
      !filteredRestaurant ||
      !cityName ||
      restaurantList.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          <div className="mt-8 text-center text-3xl font-mono font-bold text-gray-500">
            Top Rated Restaurants in {cityName}
          </div>
          <div className="filter flex items-center justify-end mr-16">
            <div className="sm:flex sm:justify-center search mr-[12rem] p-4 flex mb-3 mt-2">
              <span className="relative">
                <input
                  type="text"
                  placeholder="Search Restaurants.."
                  className="rounded-lg p-2 focus:outline-none"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                />
                <button
                  className="px-4 py-2 ml-1 bg-orange-200 rounded-lg hover:bg-orange-300 transition text-gray-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </span>
            </div>
            <div className="hidden lg:flex ml-[9rem] p-3 py-2 m-4 bg-orange-200 rounded-lg">
              <button onClick={handleTopRatedClick}>
                Top Rated Restaurants
              </button>
            </div>
          </div>
          <div className="restaurant-container flex flex-wrap justify-center items-start">
            {filteredRestaurant.map((restaurant) => (
              <Link
                className="link-card"
                key={restaurant.info.id}
                to={"/restaurant/" + restaurant.info.id}
              >
                {restaurant.info?.aggregatedDiscountInfoV3 ? (
                  <OfferCardRes resData={restaurant} />
                ) : (
                  <RestaurantCard resData={restaurant} />
                )}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
