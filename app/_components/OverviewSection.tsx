import React from "react";

// 1. Definisikan tipe data untuk props
interface OverviewSectionProps {
  overviewRef: React.RefObject<HTMLElement | null>;
  snowflakes: Array<{
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
    opacity: number;
  }>;
  backgrounds: string[];
  currentBackground: number;
  timeLeft: {
    hari: string;
    jam: string;
    menit: string;
    detik: string;
  };
}

// 2. Terapkan interface pada komponen
export default function OverviewSection({
  overviewRef,
  snowflakes,
  backgrounds,
  currentBackground,
  timeLeft,
}: OverviewSectionProps) {
  return (
    <section ref={overviewRef}>
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4">
        {/* SNOW */}
        <div className="pointer-events-none absolute inset-0 z-[999] overflow-hidden">
          {snowflakes.map((snow) => (
            <span
              key={snow.id}
              className="snowflake"
              style={{
                left: `${snow.left}%`,
                animationDelay: `${snow.delay}s`,
                animationDuration: `${snow.duration}s`,
                width: `${snow.size}px`,
                height: `${snow.size}px`,
                opacity: snow.opacity,
              }}
            />
          ))}
        </div>

        {/* BACKGROUND SLIDESHOW */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {backgrounds.map((background, index) => (
            <div
              key={background}
              className={`absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat blur-[5px] saturate-[25%] transition-opacity duration-[1500ms] ease-in-out ${
                currentBackground === index ? "opacity-100" : "opacity-0"
              } `}
              style={{
                backgroundImage: `url('${background}')`,
              }}
            />
          ))}
        </div>

        {/* OVERLAY BACKGROUND */}
        <div className="absolute inset-0 z-0 bg-[url('/paper.png')] bg-cover bg-center bg-no-repeat" />

        {/* COLOR OVERLAY */}
        <div className="absolute inset-0 z-[1] bg-[#C3C1C199]" />

        {/* FRAME CONTAINER */}
        <div className="relative aspect-[630/555] w-full max-w-[630px]">
          {/* FRAME */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/cover-frame.png')] bg-contain bg-center bg-no-repeat" />

          {/* FLOWER KIRI ATAS */}
          <div className="pointer-events-none absolute top-[-8%] left-[-5%] z-20 aspect-[279/443] w-[55%] bg-[url('/cover-flower.png')] bg-contain bg-left-top bg-no-repeat" />

          {/* CONTENT */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-[25%]">
            <p className="font-viaoda-libre text-dark-brown mb-4 text-center text-xs font-thin sm:mb-4 sm:text-lg md:text-2xl">
              We are getting married
            </p>

            <p className="font-rogue-script text-dark-brown mb-4 px-2 text-center text-4xl font-light sm:text-5xl md:text-6xl">
              Eko & Susan
            </p>

            <p className="font-viaoda-libre text-dark-brown text-center text-sm font-normal sm:text-lg md:text-2xl">
              Sabtu, 21 November 2026
            </p>
            <p className="font-viaoda-libre text-dark-brown text-center text-xs font-thin sm:text-sm md:text-lg">
              - Save the Date -
            </p>

            {/* Tampilan Countdown */}
            <div className="mt-6 mb-2 grid w-full max-w-[360px] grid-cols-4 gap-2 sm:mt-11 sm:max-w-[420px] sm:gap-4 md:mt-11">
              {/* HARI */}
              <div className="border-muted-brown/30 flex aspect-square w-full flex-col items-center justify-center rounded-md border bg-white/50">
                <span className="font-viaoda-libre text-muted-brown text-2xl font-bold sm:text-3xl">
                  {timeLeft.hari}
                </span>
                <span className="text-muted-brown font-viaoda-libre mt-1 text-[9px] font-semibold tracking-wider sm:text-[10px]">
                  Hari
                </span>
              </div>

              {/* JAM */}
              <div className="border-muted-brown/30 flex aspect-square w-full flex-col items-center justify-center rounded-md border bg-white/50">
                <span className="font-viaoda-libre text-muted-brown text-2xl font-bold sm:text-3xl">
                  {timeLeft.jam}
                </span>
                <span className="text-muted-brown font-viaoda-libre mt-1 text-[9px] font-semibold tracking-wider sm:text-[10px]">
                  Jam
                </span>
              </div>

              {/* MENIT */}
              <div className="border-muted-brown/30 flex aspect-square w-full flex-col items-center justify-center rounded-md border bg-white/50">
                <span className="font-viaoda-libre text-muted-brown text-2xl font-bold sm:text-3xl">
                  {timeLeft.menit}
                </span>
                <span className="text-muted-brown font-viaoda-libre mt-1 text-[9px] font-semibold tracking-wider sm:text-[10px]">
                  Menit
                </span>
              </div>

              {/* DETIK */}
              <div className="border-muted-brown/30 flex aspect-square w-full flex-col items-center justify-center rounded-md border bg-white/50">
                <span className="font-viaoda-libre text-muted-brown text-2xl font-bold sm:text-3xl">
                  {timeLeft.detik}
                </span>
                <span className="text-muted-brown font-viaoda-libre mt-1 text-[9px] font-semibold tracking-wider sm:text-[10px]">
                  Detik
                </span>
              </div>
            </div>

            <p className="font-rogue-script text-dark-brown/70 mt-3 text-center text-sm sm:text-lg md:text-2xl">
              - E & S -
            </p>
          </div>

          {/* FLOWER KANAN BAWAH */}
          <div className="pointer-events-none absolute right-[-5%] bottom-[-14%] z-20 aspect-[279/443] w-[55%] bg-[url('/cover-flower-2.png')] bg-contain bg-right-bottom bg-no-repeat" />
        </div>
      </div>
    </section>
  );
}
