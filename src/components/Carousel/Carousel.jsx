import { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem.jsx";
import "./Carousel.css";

function Carousel({ images, intervalSeconds = 3 }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setSelected((prev) => (prev + 1 + images.length) % images.length);
    }, intervalSeconds * 1000);

    return () => window.clearInterval(timerId);
  }, [selected, intervalSeconds, images.length]);

  if (images.length === 0) {
    return null;
  }

  const move = (direction) => {
    setSelected(
      (prev) => (prev + direction + images.length) % images.length,
    );
  };

  return (
    <div className="carousel" aria-label="קרוסלת תמונות">
      {images.map((image, index) =>
        index === selected ? (
          <CarouselItem
            key={`${image}-${index}`}
            src={image}
            alt={`תמונה ${index + 1} מתוך ${images.length}`}
          />
        ) : null,
      )}
      <button
        className="carousel-arrow prev"
        type="button"
        aria-label="התמונה הקודמת"
        onClick={() => move(-1)}
      >
        ❮
      </button>
      <button
        className="carousel-arrow next"
        type="button"
        aria-label="התמונה הבאה"
        onClick={() => move(1)}
      >
        ❯
      </button>
      <div className="carousel-dots" aria-label="בחירת תמונה">
        {images.map((image, index) => (
          <button
            className={`carousel-dot${index === selected ? " active" : ""}`}
            key={`${image}-dot-${index}`}
            type="button"
            aria-label={`מעבר לתמונה ${index + 1}`}
            aria-current={index === selected ? "true" : undefined}
            onClick={() => setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
