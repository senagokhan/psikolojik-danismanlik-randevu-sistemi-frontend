import TherapistList from '../components/Therapist/TherapistList';
import PopulerTherapistList from '../components/Therapist/PopulerTherapistList';
import CallmindFeatures from '../components/Therapist/CallmindFeatures';
import anasayfaImg from '../assets/images/anasayfa.png';
import anasayfa2Img from '../assets/images/anasayfa2.png';
import { useState, useEffect } from 'react';

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [anasayfaImg, anasayfa2Img];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 saniyede bir değişir
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#e3f2fd] flex flex-col items-center w-full">
      <section className="flex flex-col items-center py-8 md:py-16 bg-white/80 rounded-2xl shadow-lg mb-12 w-full max-w-5xl mt-8">
        {/* Image Carousel */}
        <div className="relative w-full max-w-4xl mb-6">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={images[currentImageIndex]}
              alt={`CALLMIND ana görsel ${currentImageIndex + 1}`}
              className="w-full max-w-4xl h-auto object-contain transition-opacity duration-500"
            />
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Önceki resim"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Sonraki resim"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-teal-500 scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Resim ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-black text-center tracking-tight mb-2">CALLMIND ile Hayatınıza Değer Katın</h1>
        <p className="text-base md:text-lg text-black mt-2 text-center max-w-2xl font-normal">Profesyonel terapistlerimizle daha iyi bir yaşama adım atın.</p>
      </section>
      <CallmindFeatures />
      <PopulerTherapistList />
      <TherapistList />
    </div>
  );
};

export default HomePage; 