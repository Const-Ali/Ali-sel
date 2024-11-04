import HomeComFive from "../../Components/HomeCom/HomeComFive";
import HomeComFour from "../../Components/HomeCom/HomeComFour";
import HomeComOne from "../../Components/HomeCom/HomeComOne";
import HomeComSix from "../../Components/HomeCom/HomeComSix";
import HomeComTree from "../../Components/HomeCom/HomeComTree";
import HomeComTwo from "../../Components/HomeCom/HomeComTwo";
import ImageSlider from "../../Components/ImageSlider/ImageSlider";

function Home() {
  return (
    <div className="px-52">
      <ImageSlider />
      <HomeComSix />
      <div className="grid grid-rows-3 grid-flow-col gap-4 h-[1000px] p-20 bg-gray-50">
        <div className="col-span-2 h-[440px] bg-white">
          <HomeComTwo />
        </div>
        <div className="row-span-2 h-[391px] bg-white mt-44">
          <HomeComTree />
        </div>
        <div className="row-span-3 bg- h-[735px] mt-16 bg-white">
          <HomeComOne />
        </div>
      </div>
      <HomeComFour />
      <HomeComFive />
    </div>
  );
}

export default Home;
