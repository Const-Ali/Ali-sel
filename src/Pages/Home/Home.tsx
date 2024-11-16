import Container from "../../Components/Container/Container";
import HomeComFive from "../../Components/HomeCom/HomeComFive";
import HomeComFour from "../../Components/HomeCom/HomeComFour";
import HomeComOne from "../../Components/HomeCom/HomeComOne";
import HomeComSix from "../../Components/HomeCom/HomeComSix";
import HomeComTree from "../../Components/HomeCom/HomeComTree";
import HomeComTwo from "../../Components/HomeCom/HomeComTwo";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";

function Home() {
  return (
    <Container>
      <ImageSlider />
      <div></div>
      <HomeComSix />
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
