import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { FcRating } from "react-icons/fc";
import { MdOutlineDeliveryDining } from "react-icons/md";
import RestaurantCategory from "./RestaurantCategory";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDeliveryCost } from "../utils/store/deliverySlice";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (resInfo == null) return <Shimmer />;

  const {
    name,
    cuisines,
    locality,
    avgRatingString,
    totalRatingsString,
    feeDetails,
  } = resInfo?.cards[2]?.card?.card?.info;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (cateogry) =>
        cateogry?.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const dispatch = useDispatch();
  dispatch(updateDeliveryCost({ deliveryCost: feeDetails.totalFee / 100 }));

  return (
    <div>
      <div className="ml-[25rem] flex justify-start items-center mt-[4rem] gap-[24rem]">
        <div>
          <h1 className="font-bold text-xl w-[16rem]">{name}</h1>
          <h4 className="font-light mt-1.5">{cuisines.join(", ")} </h4>
          <h4 className="font-light">{locality} </h4>
        </div>
        <div className="p-3 border border-solid rounded-lg flex-col justify-center items-center ">
          <div className="flex items-center justify-center gap-2 ">
            <div className="flex justify-center items-center gap-1.5">
              <FcRating />
              <span className="font-bold ">{avgRatingString}</span>
            </div>
          </div>
          <div className="h-1 border-b-2 border-gray-250   w-[4.7rem] self-center pt-1.5"></div>
          <div className="text-sm text-gray-500 text-[.8rem] pt-1.5 ">
            {totalRatingsString}
          </div>
        </div>
      </div>
      <div className="ml-[25rem] mt-6 ">
        <MdOutlineDeliveryDining className="inline" size={28} color="grey" />
        <h4 className="bold inline">{feeDetails.message}</h4>
      </div>
      <div>
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <div>
                <div>
                  <RestaurantCategory
                    data={category?.card?.card}
                    showListItem={index === showIndex ? true : false}
                    setShowIndex={() => {
                      setShowIndex(index === showIndex ? null : index);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
