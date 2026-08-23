import React from "react";
import { Calendar, MapPin } from "lucide-react";

interface WeddingCoupleProps {
  eventDetailRef: React.RefObject<HTMLElement | null>;
}

export default function WeddingCouple({ eventDetailRef }: WeddingCoupleProps) {
  return (
    <section
      ref={eventDetailRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-start bg-[#F9F8F6] bg-[url('/paper.png')] bg-cover bg-center px-4 pt-8 pb-20 min-[1921px]:justify-center"
    >
      {/* KONTAINER UTAMA */}
      <div className="relative  flex w-full max-w-[1100px] flex-col items-center md:mt-14">
        {/* BACKGROUND BINGKAI BUNGA (Aman & Tidak Terpotong) */}
        <div className="pointer-events-none absolute top-[45%] left-1/2 hidden aspect-[900/555] w-[95vw] max-w-[950px] -translate-x-1/2 bg-[url('/event-bg.png')] bg-contain bg-top bg-no-repeat md:block" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full w-full flex-col items-center">
          {/* JUDUL */}
          <p className="font-rogue-script text-muted-brown text-center text-5xl font-light md:text-6xl">
            Detail Acara
          </p>

          {/* GRID CONTAINER */}
          <div className="max-h mt-12 grid h-full w-full grid-cols-12 gap-y-16 md:mt-28 md:gap-x-8 md:gap-y-0">
            {/* ==================== 1. PRIA ==================== */}
            <div className="col-span-12 flex justify-center sm:col-span-6 md:justify-start">
              <div className="relative flex aspect-[4/3.3] w-full  items-center justify-center max-w-[400px]">
                {/* SVG OUTLINE */}
                <svg
                  viewBox="0 0 100 120"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -inset-2 z-20 h-[calc(100%+16px)] w-[calc(100%+16px)]"
                >
                  <polygon
                    points="50 1 90 30 90 90 50 119 10 90 10 30"
                    fill="none"
                    stroke="#ad9785"
                    strokeWidth="0.6"
                  />
                </svg>

                {/* HEKSAGON BELAKANG */}
                <div className="relative z-10 flex h-[90%] w-[90%] items-center justify-center bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                  <div className="absolute inset-[1.5px] flex flex-col items-center justify-start bg-[#F9F8F6] p-4 text-center [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                    {/* ISIAN KONTEN AKAD */}
                    <h3 className="font-rogue-script text-dark-brown mt-2 text-3xl lg:text-5xl">
                      Akad Nikah
                    </h3>
                    <div className="bg-dark-brown my-1 h-[1px] w-12" />
                    <p className="font-viaoda-libre text-dark-brown pt-2 text-md lg:text-xl font-normal">
                      Sabtu, 21 November 2026
                    </p>
                    <p className="font-viaoda-libre text-dark-brown  text-md lg:text-xl font-normal">
                      07.00 - Selesai WIB
                    </p>
                    <p className="font-viaoda-libre text-dark-brown mt-2 text-md lg:text-lg font-bold">
                      Kediaman Mempelai Wanita
                    </p>
                    <p className="font-viaoda-libre text-dark-brown mt-2 text-md lg:text-lg font-medium">
                      Kandangan Utara Rt.02/RW.07 <br />
                      Ds. Olehan Kec. Situbondo. Kab. Situbondo
                    </p>
                    <div className="relative z-50 mt-2 flex w-full items-center justify-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                      >
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Kalendar</span>
                      </button>
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                      >
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Lokasi</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* GAMBAR BUNGA */}
                <div className="pointer-events-none absolute right-[15%] -bottom-[15%] z-11 h-[70%] w-[65%] bg-[url('/event-flower.png')] bg-contain bg-bottom bg-no-repeat" />
              </div>
            </div>

            {/* ==================== 2. WANITA ==================== */}
            <div className="col-span-12 flex justify-center sm:col-span-6 md:justify-end">
              <div className="relative flex aspect-[4/3.3] w-full items-center justify-center max-w-[400px]">
                {/* SVG OUTLINE */}
                <svg
                  viewBox="0 0 100 120"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -inset-2 z-20 h-[calc(100%+16px)] w-[calc(100%+16px)]"
                >
                  <polygon
                    points="50 1 90 30 90 90 50 119 10 90 10 30"
                    fill="none"
                    stroke="#ad9785"
                    strokeWidth="0.6"
                  />
                </svg>

                {/* HEKSAGON BELAKANG */}
                <div className="relative z-10 flex h-[90%] w-[90%] items-center justify-center bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                  <div className="absolute inset-[1.5px] flex flex-col items-center justify-start bg-[#F9F8F6] p-4 text-center [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                    {/* ISIAN KONTEN AKAD */}
                    <h3 className="font-rogue-script text-dark-brown mt-2 text-3xl lg:text-5xl">
                      Resepsi
                    </h3>
                    <div className="bg-dark-brown my-1 h-[1px] w-12" />
                    <p className="font-viaoda-libre text-dark-brown pt-2 text-md lg:text-xl font-normal">
                      Sabtu, 21 November 2026
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md lg:text-xl font-normal">
                      13.00 - Selesai WIB
                    </p>
                    <p className="font-viaoda-libre text-dark-brown mt-2 text-md lg:text-lg font-bold">
                      Kediaman Mempelai Wanita
                    </p>
                    <p className="font-viaoda-libre text-dark-brown mt-2 text-md lg:text-lg font-medium">
                      Kandangan Utara Rt.02/RW.07 <br />
                      Ds. Olehan Kec. Situbondo. Kab. Situbondo
                    </p>
                    <div className="relative z-50 mt-2 flex w-full items-center justify-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                      >
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Kalendar</span>
                      </button>
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                      >
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Lokasi</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* GAMBAR BUNGA */}
                <div className="pointer-events-none absolute right-[15%] -bottom-[15%] z-11 h-[70%] w-[65%] bg-[url('/event-flower.png')] bg-contain bg-bottom bg-no-repeat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
