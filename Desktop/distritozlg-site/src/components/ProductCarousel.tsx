import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCarousel = ({ product }) => {
  const images = [product.imageFront, product.imageBack];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mb-4 mt-10">
      <img
        src={images[currentIndex]}
        alt={product.name}
        className="w-full h-auto rounded-lg shadow-md"
      />

      {/* Botões de navegação */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-2 gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-green-500" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
