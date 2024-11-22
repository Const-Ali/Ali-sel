import Container from "../../Components/Container/Container";
import HomeComEight from "../../Components/HomeComponents/HomeComEight";
import HomeComFive from "../../Components/HomeComponents/HomeComFive";
import HomeComFour from "../../Components/HomeComponents/HomeComFour";
import HomeComOne from "../../Components/HomeComponents/HomeComOne";
import HomeComSeven from "../../Components/HomeComponents/HomeComSeven";
import HomeComSix from "../../Components/HomeComponents/HomeComSix";
import HomeComTree from "../../Components/HomeComponents/HomeComTree";
import HomeComTwo from "../../Components/HomeComponents/HomeComTwo";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";

function Home() {
  return (
    <Container>
      <ImageSlider />
      <HomeComSix />
      <div className="flex justify-between items-center">
        <HomeComSeven />
        <HomeComEight />
      </div>

      <div className="grid grid-3 grid-flow-col h-fit mt-8 p-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
        <div className="col-span-2 h-full">
          <HomeComTwo />
        </div>
        <div className="row-span-2 h-full">
          <HomeComTree />
        </div>
        <div className="row-span-3 bg- h-full">
          <HomeComOne />
        </div>
      </div>
      <HomeComFour />
      <HomeComFive />
    </Container>
  );
}

export default Home;
