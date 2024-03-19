import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../utils/store/locationSlice";
import { API_ENDPOINT } from "../utils/constants";

const FilterLocationSearch = () => {
  const [filterLocation, setFilterLocation] = useState("");
  const [searchList, setSearchList] = useState(null);
  const [showLocationListItems, setShowLocationListItems] = useState(false);

  const dispatch = useDispatch();

  const fetchLocData = async (filterLocation) => {
    try {
      const locData = await fetch(
        `${API_ENDPOINT}/api/place-autocomplete?input=${filterLocation}`
      );
      const jsonLocData = await locData.json();
      setSearchList(jsonLocData.data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  const fetchLatLong = async (placeId) => {
    try {
      const latLongData = await fetch(
        `${API_ENDPOINT}/api/address?placeId=${placeId}`
      );
      const jsonLatLongData = await latLongData.json();
      const { lat, lng } = jsonLatLongData.data[0].geometry["location"];
      const cityName = jsonLatLongData.data[0].address_components[0].long_name;
      dispatch(addLocation({ lat: lat, lng: lng, city: cityName }));
    } catch (error) {
      console.error("Error fetching latitude and longitude data:", error);
    }
  };

  useEffect(() => {
    fetchLocData(filterLocation);
  }, [filterLocation]);

  const searchLocation = () => {
    fetchLocData(filterLocation);
  };

  return (
    <div className="absolute ml-[14rem]">
      <div className="flex">
        <FaLocationDot size={28} color="gray" />
        <input
          className="border border-none p-2 focus:outline-none border-gray-600 hover:cursor-pointer"
          onChange={(event) => {
            setFilterLocation(event.target.value);
            searchLocation();
          }}
          placeholder="Enter your Location!"
          value={filterLocation}
          onClick={() => {
            setFilterLocation("");
            setShowLocationListItems(true);
          }}
        />
        {searchList?.length && showLocationListItems && (
          <div className="absolute mt-10 w-full p-2 rounded-lg shadow-md z-50 bg-gray-50 text-black">
            <ul>
              {Array.isArray(searchList) &&
                searchList.map((location, index) =>
                  location ? (
                    <li
                      className="p-1 hover:bg-gray-200 rounded-lg cursor-pointer"
                      key={index}
                      onClick={() => {
                        setFilterLocation(location.description);
                        {
                          /* Set filterLocation */
                        }
                        const placeId = location.place_id;
                        fetchLatLong(placeId);
                        setShowLocationListItems(false);
                      }}
                    >
                      {location.description}
                    </li>
                  ) : (
                    <div key={index}></div>
                  )
                )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterLocationSearch;
