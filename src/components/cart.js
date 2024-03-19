import { useSelector, useDispatch } from "react-redux";
import { ITEM_LIST_API_IMAGE } from "../utils/constants";
import { updateQty, deleteItem } from "../utils/store/cartSlice";
import { updateDeliveryCost } from "../utils/store/deliverySlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  let qtySum = 0;
  if (Array.isArray(cartItems)) {
    cartItems.forEach((item) => {
      qtySum += item["qty"];
    });
  }
  const dispatch = useDispatch();
  const handleAddItemClick = (newItem, action) => {
    const selectedItem = cartItems.find(
      ({ item }) => item["card"].info.id === newItem.item.card.info.id
    );

    if (selectedItem && action == "incr") {
      dispatch(
        updateQty({ id: newItem.item.card.info.id, qty: selectedItem.qty + 1 })
      );
    } else if (selectedItem && action == "decr") {
      dispatch(
        updateQty({ id: newItem.item.card.info.id, qty: selectedItem.qty - 1 })
      );
      if (qtySum == 1) dispatch(updateDeliveryCost({ deliveryCost: 0 }));
    } else if (selectedItem && action == "del") {
      dispatch(deleteItem({ id: newItem.item.card.info.id, qty: 0 }));

      if (qtySum == 1 || cartItems.length == 1)
        dispatch(updateDeliveryCost({ deliveryCost: 0 }));
    }
  };

  const deliveryFees = useSelector((store) => store.delivery.cost);

  const totalPrice = cartItems.reduce((total, item) => {
    const price =
      (item.item.card.info.price / 100 ||
        item.item.card.info.defaultPrice / 100) * item.qty;
    return total + price;
  }, 0);

  return (
    <div>
      <div className="flex justify-center font-bold  text-gray-600 font-mono mt-6 mb-8">
        <div className="flex-col">
          <div className="text-center text-3xl text-gray-600">CART</div>
          <div className="mt-2 text-3xl text-gray-500">
            TOTAL ₹{Math.round((totalPrice + deliveryFees) * 100) / 100}
          </div>
          <div className="mt-2 text-xl text-center font-bold text-gray-400">
            DELIVERY-FEE ₹{deliveryFees}
          </div>
        </div>
      </div>
      <div className="flex-wrap justify-start ">
        {cartItems?.map((item) => (
          <div
            key={item.item.card.info.id}
            className="mt-2 pl-1 flex justify-start w-full"
          >
            <div className="mx-auto flex justify-between w-3/12">
              <div className="content-sec">
                {item.item.card.info.isVeg ? (
                  <span className=" text-green-600 font-bold border border-green-700 p-0.5 bg-green-50  text-xs">
                    VEG
                  </span>
                ) : (
                  <span className="text-red-700 font-bold border border-red-700 p-0.5 bg-red-50">
                    NON-VEG
                  </span>
                )}
                <span>
                  <h3 className="font-bold w-[12rem]">
                    {item.item.card.info.name}{" "}
                  </h3>
                </span>
                <h4 className="text-gray-700 mt-1 ">
                  {" "}
                  ₹
                  {(item.item.card.info.price / 100 ||
                    item.item.card.info.defaultPrice / 100) * item.qty}
                </h4>

                <h4 className="font-bold">Quantity: {item.qty}</h4>
              </div>
              <div className="flex flex-col">
                <div className="img-sec">
                  <img
                    className="w-[5rem] h-auto rounded-lg shadow-lg"
                    src={ITEM_LIST_API_IMAGE + item.item.card.info.imageId}
                  />
                  <button
                    className="px-3 bg-white opacity-100 text-green-500 rounded-xl p-1 border shadow-md font-bold"
                    onClick={() => handleAddItemClick(item, "incr")}
                  >
                    +
                  </button>
                  <button
                    className="px-3 bg-white opacity-100 text-green-500 rounded-xl p-1 border shadow-md font-bold"
                    onClick={() => handleAddItemClick(item, "decr")}
                  >
                    &#x2212;
                  </button>
                </div>
                <button
                  className="px-3 bg-white opacity-100 text-red-500 rounded-xl p-1 border shadow-md font-bold"
                  onClick={() => handleAddItemClick(item, "del")}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
