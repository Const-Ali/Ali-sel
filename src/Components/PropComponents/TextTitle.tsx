interface TextTitleProps {
  value: string;
}

const TextTitle: React.FC<TextTitleProps> = ({ value }) => (
  <div className="flex items-center justify-center">
    <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-slate-400 to-stone-600 font-thin">
      {value}
    </h1>
  </div>
);

export default TextTitle;
