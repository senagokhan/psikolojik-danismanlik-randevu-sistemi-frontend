import TherapistList from '../components/Therapist/TherapistList';
import PopulerTherapistList from '../components/Therapist/PopulerTherapistList';
import CallmindFeatures from '../components/Therapist/CallmindFeatures';
import anasayfaImg from '../assets/images/anasayfa.png';

const HomePage = () => {
  return (
    <div>
      <section className="flex flex-col items-center py-8 md:py-16 bg-[#FAF0F4] rounded-lg mb-12 w-full">
        <img
          src={anasayfaImg}
          alt="CALLMIND ana görsel"
          className="w-full max-w-4xl h-auto object-contain mb-6 rounded-xl shadow-md"
        />
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] text-center">CALLMIND ile Hayatınıza Değer Katın</h1>
        <p className="text-lg text-[#1F2937] mt-4 text-center max-w-2xl">Profesyonel terapistlerimizle daha iyi bir yaşama adım atın.</p>
      </section>
      <CallmindFeatures />
      <PopulerTherapistList />
      <TherapistList />
    </div>
  );
};

export default HomePage; 