import { useEffect, useState } from "react";

import { useData, useWindowDimensions } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../slices/authenticationSlice";

import { RootState } from "../../store";
import Navbar from "../../components/user/Navbar";
import { GrUserAdmin } from "react-icons/gr";
import Dailog from "../../ui/user/Dailog";

import ScreenContainer from "../../ui/user/ScreenContainer";

import Footer from "../../components/user/Footer";

import { motion, useScroll } from "framer-motion";

import Slider from "../../components/user/Slider";

import CartSec from "../../components/user/CartSec";

import BottmNavbar from "../../components/user/BottmNavbar";

import SessionTimeOut from "../../components/SessionTimeOut";

import LatestArrivals from "../../components/user/LatestArrivals";
import Category from "../../components/user/Category";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export const CircleIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.path
      className={"bg-deep-orange-900"}
      d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
      style={{ pathLength: scrollYProgress }}
    />
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("signin/");
  };

  const { user_not } = useSelector((state: RootState) => state.alertSlice);

  const { width } = useWindowDimensions();

  const [cartOpen, setCartOpen] = useState(false);

  const onOpenOrClose = () => setCartOpen(!cartOpen);

  const { scrollPosition } = useScrollPosition();

  const getBackGroundClass = (scrollLength: number) => {
    if (scrollLength > 180) {
      if (width < 769 && scrollLength < 570) {
        return "backdrop-blur-2xl";
      } else if (scrollLength < 1012) {
        return "backdrop-blur-2xl";
      }
    }

    if (width < 769 && scrollLength > 500) {
      return "bg-black";
    }

    if (
      (width > 769 && scrollLength > 1012) ||
      (width < 769 && scrollLength > 500)
    ) {
      return "bg-black";
    }
  };

  return (
    <div className="scroller">
      <ScreenContainer>
        <div
          className={`fixed z-50  h-16 w-full  top-0 left-0 right-0   ${getBackGroundClass(
            scrollPosition
          )}`}
        >
          <Navbar onOpen={onOpenOrClose} />
        </div>

        <div className="scrollbar-thumb-black scrollbar-thin scrollbar-track-gray-100">
          <Slider />
        </div>
        {/* <Hero /> */}

        {/* <div className=" flex w-full justify-between items-center"></div>
        <div className="w-full h-screen">
          <div className="w-full p-6">
            <button
              onClick={handleLogout}
              className="rounded p-2 w-32 bg-red-700 text-white"
            >
              Deconnexion
            </button>
          </div>
          {user ? (
            <div className="w-full h-full text-center items-center">
              <p className="self-center my-auto">Welcome, {user.email}</p>
            </div>
          ) : (
            <p className="text-center items-center">Loading ...</p>
          )}
        </div> */}
        <Category />
        <CircleIndicator />
        <LatestArrivals />

        {cartOpen && <CartSec onClose={onOpenOrClose} />}

        <Footer />

        <BottmNavbar />
      </ScreenContainer>
      {user_not && <SessionTimeOut />}
    </div>
  );
};

export default Home;
