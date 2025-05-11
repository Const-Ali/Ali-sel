import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import ProCol from "../PropComponents/ProCol";

interface LinkItem {
  path: string;
  titleOne: string;
  srcImg: string;
}

function HomeComSix() {
  const initialLinks: LinkItem[] = [
    {
      path: `/${encodeURIComponent("CollectionTablet")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901206/theme-copy-8-1_ixbtzj.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionCharger")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901202/theme-copy-4_ccv1dy.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionAirPods")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901204/theme-copy-3_gqdrho.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionWatch")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901205/theme-copy-2_pxvcuv.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionPhone")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901207/theme-copy-1_exlnnw.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionSpeaker")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901203/theme-copy-5_gqvnta.webp",
    },
    {
      path: `/${encodeURIComponent("CollectionLaptaps")}`,
      titleOne: "تخفیف",
      srcImg:
        "https://res.cloudinary.com/ds1yjxg7s/image/upload/v1746901208/laptop_ks2jq4.webp",
    },
  ];

  const [visibleLinks, setVisibleLinks] = useState<LinkItem[]>(initialLinks);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setVisibleLinks((prevLinks) => {
          const firstLink = prevLinks[0];
          const remainingLinks = prevLinks.slice(1);
          return [...remainingLinks, firstLink];
        });
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <h1 className="flex justify-center items-center p-4 text-2xl">
        دسته بندی محصولات
      </h1>
      <div className="flex justify-between items-center p-4 mx-20 overflow-hidden">
        <div
          className={`flex transition-transform gap-x-5 duration-500 ${
            isTransitioning
              ? "-translate-x-5 opacity-50"
              : "translate-x-0 opacity-100"
          }`}
        >
          {visibleLinks.map((link, index) => (
            <Link to={link.path} key={index} className="flex-shrink-0">
              <ProCol TitleOne={link.titleOne} SrcImg={link.srcImg} />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default HomeComSix;
