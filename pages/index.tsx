import About from "components/User/Home/About";
import Communauté from "components/User/Home/Communauté";
import Footer from "components/User/Home/Footer";
import HomePage from "components/User/Home/HomePage";
import New from "components/User/Home/New";
import SignUp from "components/User/Home/SignUp";
import LayoutPublic from "components/Layout/LayoutPublic";
import { CustomNextPage } from "types";

const Home: CustomNextPage = () => {
  return (
    <div className="bg-white">
      <HomePage />
      <About />
      <SignUp />
      <New />
      <Communauté />
      <Footer />
    </div>
  );
};

export default Home;

Home.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;
