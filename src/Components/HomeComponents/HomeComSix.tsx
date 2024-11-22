import { Link } from "react-router-dom";
import Container from "../Container/Container";
import ProCol from "../PropComponents/ProCol";

function HomeComSix() {
  return (
    <Container>
      <div className="flex justify-between items-center p-4 gap-x-5 mx-20 overflow-x-auto">
        <Link to={`/${encodeURIComponent("CollectionTablet")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="تبلت"
            SrcImg="https://www.upload.ee/image/17349048/12.png"
          />
        </Link>
        <Link to={`/${encodeURIComponent("CollectionCharger")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="شارژر"
            SrcImg="https://www.upload.ee/image/17349049/113.png"
          />
        </Link>
        <Link to={`/${encodeURIComponent("CollectionAirPods")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="هندزفری"
            SrcImg="https://www.upload.ee/image/17349050/hp-copy-1.png"
          />
        </Link>
        <Link to={`/${encodeURIComponent("CollectionWatch")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="ساعت"
            SrcImg="https://www.upload.ee/image/17349051/wa.png"
          />
        </Link>
        <Link to={`/${encodeURIComponent("CollectionPhone")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="موبایل"
            SrcImg="https://www.upload.ee/image/17349052/mobile01__1_.png"
          />
        </Link>
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>{" "}
        <Link to={`/${encodeURIComponent("CollectionSpeaker")}`}>
          <ProCol
            TitleOne="تخفیف"
            TitleTwo="اسپیکر"
            SrcImg="https://www.upload.ee/image/17349053/sp2.png"
          />
        </Link>
      </div>
    </Container>
  );
}

export default HomeComSix;
