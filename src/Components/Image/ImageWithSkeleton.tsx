import { useInView } from "react-intersection-observer";
import { useState } from "react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  classNameWrapper?: string;
}

const ImageWithSkeleton = ({
  src,
  alt = "",
  fallback = "/fallback.jpg",
  className = "",
  classNameWrapper = "",
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={`relative ${classNameWrapper}`}>
      {(!loaded || !src) && (
        <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
      )}

      {inView && (
        <img
          src={error ? fallback : src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-opacity duration-500 object-cover ${
            loaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          {...rest}
        />
      )}
    </div>
  );
};

export default ImageWithSkeleton;
