import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import ProCol from "../PropComponents/ProCol";

interface LinkItem {
  path: string;
  titleOne: string;
  titleTwo: string;
  srcImg: string;
}

function HomeComSix() {
  const initialLinks: LinkItem[] = [
    {
      path: `/${encodeURIComponent("CollectionTablet")}`,
      titleOne: "تخفیف",
      titleTwo: "تبلت",
      srcImg: "https://www.upload.ee/image/17349048/12.png",
    },
    {
      path: `/${encodeURIComponent("CollectionCharger")}`,
      titleOne: "تخفیف",
      titleTwo: "شارژر",
      srcImg: "https://www.upload.ee/image/17349049/113.png",
    },
    {
      path: `/${encodeURIComponent("CollectionAirPods")}`,
      titleOne: "تخفیف",
      titleTwo: "هندزفری",
      srcImg: "https://www.upload.ee/image/17349050/hp-copy-1.png",
    },
    {
      path: `/${encodeURIComponent("CollectionWatch")}`,
      titleOne: "تخفیف",
      titleTwo: "ساعت",
      srcImg: "https://www.upload.ee/image/17349051/wa.png",
    },
    {
      path: `/${encodeURIComponent("CollectionPhone")}`,
      titleOne: "تخفیف",
      titleTwo: "موبایل",
      srcImg: "https://www.upload.ee/image/17349052/mobile01__1_.png",
    },
    {
      path: `/${encodeURIComponent("CollectionSpeaker")}`,
      titleOne: "تخفیف",
      titleTwo: "اسپیکر",
      srcImg: "https://www.upload.ee/image/17349053/sp2.png",
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
              <ProCol
                TitleOne={link.titleOne}
                TitleTwo={link.titleTwo}
                SrcImg={link.srcImg}
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default HomeComSix;
