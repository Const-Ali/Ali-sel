interface TextTitleProps {
  value: string;
}

const TextTitle: React.FC<TextTitleProps> = ({ value }) => (
  <>
    <span className="relative flex justify-center">
      <div className="absolute inset-x-0 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

      <span className="relative z-10 px-6 text-xl font-bold pt-3">{value}</span>
    </span>
  </>
);

export default TextTitle;
