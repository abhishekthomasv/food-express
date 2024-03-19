import ItemList from "./ItemList";
import { FaAngleDown } from "react-icons/fa6";

const RestaurantCategory = ({ data, showListItem, setShowIndex }) => {
  return (
    <div>
      {" "}
      <div className="mx-auto w-6/12 bg-gray-100  shadow-lg rounded-lg my-5  flex-col p-2">
        <div
          className="flex justify-between hover:cursor-pointer pb-1"
          onClick={() => {
            setShowIndex();
          }}
        >
          <span className="font-bold text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span>
            <FaAngleDown size={20} color="gray" />
          </span>
        </div>
        <div>{showListItem && <ItemList data={data.itemCards} />}</div>
      </div>
    </div>
  );
};
export default RestaurantCategory;
