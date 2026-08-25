import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OurLoveStoryProps {
  ourLoveStoryRef: React.RefObject<HTMLElement | null>;
}

interface StoryItem {
  id: number;
  title: string;
  date: string;
  sub: string;
  description: string;
}

export default function OurLoveStory({ ourLoveStoryRef }: OurLoveStoryProps) {
  const initialStories: StoryItem[] = [
    {
      id: 1,
      title: "Kenalan",
      date: "Januari, 2025",
      sub: "Awal dari Sebuah Pertemuan",
      description:
        "Semua berawal dari sebuah perkenalan sederhana. Kami mulai saling mengenal, memahami karakter dan kebiasaan masing-masing, hingga perlahan menemukan keyakinan untuk melangkah bersama.",
    },
    {
      id: 2,
      title: "Komitmen",
      date: "September, 2025",
      sub: "Mengenal Lebih Dalam",
      description:
        "Dari saling mengenal, kami mulai melangkah lebih serius, mempertemukan dan mengenal keluarga, hingga menyatukan dua hati dan dua keluarga dalam satu tujuan.",
    },
    {
      id: 3,
      title: "Lamaran",
      date: "Januari, 2026",
      sub: "Menuju Satu Tujuan",
      description:
        "Setelah melewati berbagai perjalanan, dengan doa dan restu kedua orang tua serta petunjuk Allah SWT, kami memantapkan hati untuk melangkah bersama menuju ikatan yang lebih serius.",
    },
    {
      id: 4,
      title: "Menikah",
      date: "November, 2026",
      sub: "Menuju Hari Bahagia",
      description:
        "Setelah perjalanan yang kami lalui, InsyaAllah kami akan melangkah menuju ikatan suci pernikahan pada November 2026. Semoga menjadi awal perjalanan panjang yang penuh cinta, keberkahan, dan ridha Allah SWT.",
    },
  ];
  const sliderRef = useRef<HTMLDivElement>(null);
  const [stories, setStories] = useState<StoryItem[]>(initialStories);
  const [activeIndex, setActiveIndex] = useState(0);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 860) {
        setVisibleCount(1); // HP: 1 kartu
      } else if (window.innerWidth <= 1024) {
        setVisibleCount(2); // Tablet: 2 kartu
      } else {
        setVisibleCount(3); // Desktop: 3 kartu
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScrollRight = () => {
    setStories((prevStories) => {
      const updated = [...prevStories];
      const firstItem = updated.shift();
      if (firstItem) updated.push(firstItem);
      return updated;
    });

    setActiveIndex((prev) => (prev + 1) % initialStories.length);
  };

  const handleScrollLeft = () => {
    setStories((prevStories) => {
      const updated = [...prevStories];
      const lastItem = updated.pop();
      if (lastItem) updated.unshift(lastItem);
      return updated;
    });

    setActiveIndex(
      (prev) => (prev - 1 + initialStories.length) % initialStories.length,
    );
  };

  return (
    <section
      ref={ourLoveStoryRef}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[url('/paper.png')] py-12"
    >
      <div className="flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-4">
        {/* Judul Utama */}
        <h2 className="font-rogue-script text-muted-brown text-center text-5xl font-light sm:text-6xl">
          Our Love Story
        </h2>

        {/* Area Konten Utama */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-6">
          <div className="relative flex w-full items-center justify-between px-2">
            {/* Tombol Kiri */}
            <button
              type="button"
              onClick={handleScrollLeft}
              className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white/80 text-gray-600 shadow transition hover:bg-white active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Pembungkus Slider Responsif */}
            <div className="mx-auto flex w-full max-w-[310px] items-center justify-center overflow-hidden py-8 sm:max-w-[620px] lg:max-w-[1100px]">
              {/* Berikan px-6 di sini agar bunga di kartu pertama/terakhir tidak terpotong atau ke-expose di batas luar */}
              <div
                ref={sliderRef}
                className="flex items-center justify-center gap-4 px-6 sm:gap-6"
              >
                {stories.slice(0, visibleCount).map((item, index) => (
                  <div
                    key={`story-card-${item.id}-${index}`}
                    className="bg-light-gray relative flex aspect-[3/4] w-[260px] flex-none shrink-0 flex-col items-start justify-center rounded-tl-[45px] rounded-tr-[15px] rounded-br-[45px] rounded-bl-[15px] border border-[#d2a37e] p-6 shadow-sm backdrop-blur-sm transition-all duration-500 ease-in-out sm:w-[320px] sm:p-11 md:mx-1"
                  >
                    {/* Bunga Kiri Atas: Diatur agar aman di batas kartu (-top-[6%] -left-[2%]) */}
                    <img
                      src="/story-flower-1.png"
                      alt="Bunga Kiri Atas"
                      className="pointer-events-none absolute -top-[4%] -left-[3%] z-10 w-[32%] object-contain"
                    />

                    {/* Bunga Kanan Bawah */}
                    <img
                      src="/story-flower-2.png"
                      alt="Bunga Kanan Bawah"
                      className="pointer-events-none absolute -right-[4.5%] -bottom-[4.5%] z-10 w-[28%] object-contain"
                    />

                    <h3 className="font-rogue-script text-dark-brown z-11 text-3xl md:text-5xl">
                      {item.title}
                    </h3>
                    <p className="font-viaoda-libre text-dark-brown z-11 text-base italic md:text-lg">
                      {item.date}
                    </p>
                    <p className="font-viaoda-libre text-dark-brown z-11 mt-1 text-xs leading-relaxed font-bold md:text-base">
                      {item.sub}
                    </p>
                    <p className="font-viaoda-libre text-dark-brown z-11 mt-1 text-xs leading-relaxed whitespace-pre-line md:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Kanan */}
            <button
              type="button"
              onClick={handleScrollRight}
              className="z-30 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-400 bg-white/80 text-gray-600 shadow transition hover:bg-white active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Indikator Bulatan Carousel */}
          <div className="flex items-center gap-2">
            {initialStories.map((_, index) => (
              <div
                key={`dot-indicator-${index}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-6 bg-[#d2a37e]"
                    : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
