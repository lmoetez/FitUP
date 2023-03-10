import About from "components/User/Home/About";
import Communaut√© from "components/User/Home/Communaut√©";
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
      <Communaut√© />
      <Footer />
    </div>
  );
};

export default Home;

Home.getLayout = (Page) => <LayoutPublic>{Page}</LayoutPublic>;
