import { ITEM_LIST_API_IMAGE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQty } from "../utils/store/cartSlice";

const vegIcon =
  "https://iamgoingvegan.b-cdn.net/wp-content/uploads/2020/05/Indian-Vegetarian-Mark-1-1024x1024.jpg";

const ItemList = ({ data }) => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleAddItemClick = (newItem) => {
    const existingItem = cartItems.find(
      ({ item }) => item["card"].info.id === newItem.card["info"].id
    );

    if (existingItem) {
      dispatch(
        updateQty({ id: newItem.card["info"].id, qty: existingItem.qty + 1 })
      );
    } else
      dispatch(addItem({ item: newItem, qty: 1, id: newItem.card.info.id }));
  };

  return (
    <div>
      <div>
        {data?.map((item) => (
          <div key={item.card.info.id} className="mt-2">
            <div className="pl-1 flex justify-between items-center">
              <div>
                {item.card.info.isVeg ? (
                  <span className=" text-green-600 font-bold border border-green-700 p-0.5 bg-green-50 ">
                    VEG
                  </span>
                ) : (
                  <span className="text-red-700 font-bold border border-red-700 p-0.5 bg-red-50">
                    NON-VEG
                  </span>
                )}
                <h3 className="font-bold w-[24rem]">{item.card.info.name}</h3>
                <h4 className="text-gray-700 mt-1 ">
                  {" "}
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </h4>

                <h4 className="mt-4 text-gray-400 text-[.9rem] w-[22rem]">
                  {item.card.info.description}
                </h4>
              </div>
              <div className="relative">
                <img
                  className="h-[8rem] w-[9rem] rounded-lg ml-[8rem] shadow-lg"
                  src={ITEM_LIST_API_IMAGE + item.card.info.imageId}
                />
                <button
                  className="absolute  translate-y-[-1.5rem] translate-x-10 right-[3rem] px-10  z-10 bg-white opacity-100 text-green-500 rounded-xl p-2 border shadow-md  hover:scale-110 hover:transition-shadow delay-150 duration-300"
                  onClick={() => handleAddItemClick(item)}
                >
                  Add <sup> +</sup>
                </button>
              </div>
            </div>
            <div className="relative flex py-8 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
