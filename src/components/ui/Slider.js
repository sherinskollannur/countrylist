import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "./Button";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const nextSlide = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    hiddenRight: { x: "100%", opacity: 0 },
    hiddenLeft: { x: "-100%", opacity: 0 },
    visible: { x: "0", opacity: 1 },
    exit: { x: direction === "right" ? "-100%" : "100%", opacity: 0 },
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
            transition={{ duration: 0.5 }}
            className="slide"
          >
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
            />
            <div className="slide-content">
              <h3>{slides[currentIndex].title}</h3>
              <p>{slides[currentIndex].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Button
        className="slider-btn prev"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </Button>
      <Button
        className="slider-btn next"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FaChevronRight />
      </Button>

      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
