import React from 'react';

const features = [
  {
    icon: (
      // Heroicons: ChatBubbleLeftEllipsis (daha simetrik)
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-teal-500 mx-auto mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 3.728 3.64 6.75 8.25 6.75.98 0 1.93-.11 2.82-.32.37-.08.76-.02 1.06.19l2.12 1.41a.75.75 0 001.17-.62v-2.06c0-.28.16-.54.41-.67C20.36 15.6 21.75 13.93 21.75 12c0-3.728-3.64-6.75-8.25-6.75S2.25 8.272 2.25 12z" />
        <circle cx="8.5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="15.5" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Ön Görüşme Veya Mesaj',
    desc: 'Ücretsiz ön görüşme ile danışman ile tanışabilirsiniz veya mesaj atarak soru sorabilirsiniz.'
  },
  {
    icon: (
      // Heroicons: Map Pin
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-400 mx-auto mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.5-7.5 11.25-7.5 11.25S4.5 18 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: 'Lokasyondan Bağımsız',
    desc: 'Evinizde, iş yerinizde, size en uygun ortamdan uzman danışmanlarımızdan birini seçin.'
  },
  {
    icon: (
      // Heroicons: Calendar
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-400 mx-auto mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5v12A1.5 1.5 0 004.5 21z" />
      </svg>
    ),
    title: 'Randevu Alın',
    desc: 'Size uygun tarih ve saati seçin ve randevunuzu alın, dilediğiniz danışman ile seansınızı gerçekleştirin.'
  },
];

const CallmindFeatures = () => (
  <section className="my-12 w-full max-w-5xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#234e52]">CALLMIND ile Yapabilecekleriniz</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((f, i) => (
        <div key={i} className="bg-white/90 rounded-xl shadow p-6 flex flex-col items-center text-center h-full border border-teal-50">
          {f.icon}
          <h3 className="font-bold text-lg text-[#234e52] mb-2">{f.title}</h3>
          <p className="text-gray-600 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CallmindFeatures; 