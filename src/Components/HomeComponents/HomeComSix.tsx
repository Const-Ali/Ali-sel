import Slider from "react-slick";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import ProCol from "../PropComponents/ProCol";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface LinkItem {
  path: string;
  titleOne: string;
  srcImg: string;
}

function HomeComSix() {
  const links: LinkItem[] = [
    {
      path: "/CollectionTablet",
      titleOne: "تبلت",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901206/theme-copy-8-1_ixbtzj.webp",
    },
    {
      path: "/CollectionCharger",
      titleOne: "شارژر",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901202/theme-copy-4_ccv1dy.webp",
    },
    {
      path: "/CollectionAirPods",
      titleOne: "ایرپاد",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901204/theme-copy-3_gqdrho.webp",
    },
    {
      path: "/CollectionWatch",
      titleOne: "ساعت هوشمند",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901205/theme-copy-2_pxvcuv.webp",
    },
    {
      path: "/CollectionPhone",
      titleOne: "موبایل",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901207/theme-copy-1_exlnnw.webp",
    },
    {
      path: "/CollectionSpeaker",
      titleOne: "اسپیکر",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901203/theme-copy-5_gqvnta.webp",
    },
    {
      path: "/CollectionLaptaps",
      titleOne: "لپ‌تاپ",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901208/laptop_ks2jq4.webp",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <h1 className="flex justify-center items-center p-4 text-2xl font-bold">
        دسته‌بندی محصولات
      </h1>
      <Slider {...settings}>
        {links.map((link, index) => (
          <div key={index} className="px-">
            <Link to={link.path}>
              <ProCol TitleOne={link.titleOne} SrcImg={link.srcImg} />
            </Link>
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default HomeComSix;
