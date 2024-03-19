import { CDN_URL } from "../utils/constants";
import { FcRating } from "react-icons/fc";

const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, cuisines, avgRatingString, cloudinaryImageId, sla } =
    resData?.info;

  return (
    <div
      className="restaurant-card card-text m-1 p-1 w-[350px] h-[420px] transform transition duration-500 
    hover:scale-95 self-center "
    >
      <img
        className="res-logo w-[320px] h-[260px]  rounded-2xl "
        src={CDN_URL + cloudinaryImageId}
      />
      <div className="card-text m-1 ">
        <h3 className="restaurant-name font-bold text-lg">{name}</h3>
        <div className="flex gap-2 items-center font-bold">
          <FcRating />
          <h4>{avgRatingString}</h4>
          <h4>{"• " + sla.slaString}</h4>
        </div>
        <div className=" px-1 flex gap-1">
          <span className="w-[300px]">{cuisines.join(", ")}</span>
          {/* <span>{costForTwo}</span> */}
        </div>
      </div>
    </div>
  );
};

export const offerCard = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className=" absolute text-2xl p-1 font-bold top-[1.3rem] left-[.1rem] z-10  text-white bg-black bg-opacity-60 rounded-lg  ">
          {props?.resData.info?.aggregatedDiscountInfoV3?.header}{" "}
          {props?.resData.info?.aggregatedDiscountInfoV3?.subHeader}
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
