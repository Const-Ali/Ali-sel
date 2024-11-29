import Container from "../../Components/Container/Container";
import HomeComEight from "../../Components/HomeComponents/HomeComEight";
import HomeComFive from "../../Components/HomeComponents/HomeComFive";
import HomeComFour from "../../Components/HomeComponents/HomeComFour";
import HomeComNine from "../../Components/HomeComponents/HomeComNine";
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
        <HomeComNine />
      </div>
      <div className="flex">
        <a
          href="CollectionPhone"
          className="group relative block overflow-hidden rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
        >
          <HomeComEight SrcImg="https://www.upload.ee/image/17451737/1233.jpg" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
        <a
          href="CollectionPhone"
          className="group relative block overflow-hidden rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
        >
          <HomeComEight SrcImg="https://www.upload.ee/image/17451743/13234.jpg" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
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

      <div className="flex py-5">
        <a
          href="CollectionWatch"
          className="group relative block overflow-hidden rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
        >
          <HomeComEight SrcImg="https://www.upload.ee/image/17451759/7896.jpg" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
        <a
          href="CollectionSpeaker"
          className="group relative block overflow-hidden rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110 hover:rotate-1"
        >
          <HomeComEight SrcImg="https://www.upload.ee/image/17451762/789456.jpg" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
      </div>
      <HomeComFour />
      <HomeComFive />
    </Container>
  );
}

export default Home;
