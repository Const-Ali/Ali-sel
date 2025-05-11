interface ProColProps {
  TitleOne: string;
  SrcImg: string;
}

const ProCol: React.FC<ProColProps> = ({ TitleOne, SrcImg }) => (
  <div className="w-52">
    <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 cursor-pointer shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-2xl font-[sans-serif] overflow-hidden mx-auto transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_8px_24px_-5px_rgba(0,0,0,0.4)] relative">
      <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg transform -rotate-12">
        {TitleOne}
      </div>

      <img src={SrcImg} className="w-full rounded-2xl" />
    </div>
  </div>
);

export default ProCol;
