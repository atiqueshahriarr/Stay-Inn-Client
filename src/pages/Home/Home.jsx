import { Helmet } from "react-helmet";
import Banner from "./Banner/Banner";
import FeaturedRooms from "./FeaturedRoom/FeaturedRooms";
import Map from "./Map/Map";
import Newsletter from "./Newsletter/Newsletter";
import PopUp from "./PopUp/PopUp";
import Ratings from "./Ratings/Ratings";

const Home = () => {
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.getElementById("popup_1").showModal();
    }, 5000);
  });

  return (
    <div>
      <Helmet>
        <title>Stay Inn | Home</title>
      </Helmet>
      <div>
        <Banner></Banner>
        <dialog id="popup_1" className="modal">
          <PopUp></PopUp>
        </dialog>
        <FeaturedRooms></FeaturedRooms>
        <Ratings></Ratings>
        <Newsletter id="ourLocation"></Newsletter>

        <Map></Map>
      </div>
    </div>
  );
};

export default Home;
