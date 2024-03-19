import { LOGO_URL } from "../utils/constants";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

import FilterLocationSearch from "./FilterLocationSearch";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  let sum = 0;
  if (Array.isArray(cartItems)) {
    cartItems.forEach((item) => {
      sum += item["qty"];
    });
  }

  return (
    <div>
      <div className="hidden md:flex  justify-between bg-white shadow-md  items-center font-normal text-slate-500 text-sm">
        <Link to="/">
          <div className="logo-container ml-20">
            <img className="w-[8rem]" src={LOGO_URL} />
          </div>
        </Link>
        <FilterLocationSearch />
        <div className="nav-items mr-[5rem]">
          <ul className="flex p-4 m-4 text-lg ">
            <li className="px-4  hover:text-orange-500 delay-100 transition-colors font-mono">
              <Link className="link" to="/">
                Restaurants
              </Link>
            </li>
            <li className="px-4  hover:text-orange-500 delay-100 transition-colors font-mono">
              <Link className="link" to="/about">
                About me!
              </Link>
            </li>
            <li className="px-4 flex  hover:text-orange-600 delay-100 transition-colors">
              <Link to="/cart">
                <span>
                  <FaShoppingCart size={38} />
                </span>
                <div className="absolute z-30 translate-x-[1.1rem] translate-y-[-2.09rem] text-white text-sm font-bold">
                  {sum}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="md:hidden text-slate-500 flex justify-end">
        <li className=" pt-[1rem] pb-0 px-8 flex   hover:text-orange-600 delay-100 transition-colors">
          <Link to="/cart">
            <span className="bg-orange-300">
              <FaShoppingCart size={38} />
            </span>
            <div className="absolute z-30 translate-x-[1.1rem] translate-y-[-2.09rem] text-white text-sm font-bold">
              {sum}
            </div>
          </Link>
        </li>
      </div>
    </div>
  );
};

export default Header;
