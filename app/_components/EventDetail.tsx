import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { eventNames } from "process";

interface WeddingCoupleProps {
  eventDetailRef: React.RefObject<HTMLElement | null>;
  invitation: String;
}

export default function WeddingCouple({
  eventDetailRef,
  invitation,
}: WeddingCoupleProps) {
  // Fungsi untuk Tombol Kalendar
  interface CalendarPayload {
    eventName: string;
    time: string;
  }
  const groomAndBride = "Eko & Susan";
  const place =
    "Kandang Utara Rt.02/RW.07\nDs. Olehan Kec. Situbondo. Kab. Situbondo";

  const handleCalendarClick = (payload: CalendarPayload) => {
    const { eventName, time } = payload;

    let startDate = "";
    let endDate = "";

    if (eventName === "Resepsi") {
      startDate = convertToCalendarUTC("2026-11-21", "13:00");
      endDate = convertToCalendarUTC("2026-11-21", "23:59");
    } else if (eventName === "Akad Nikah") {
      startDate = convertToCalendarUTC("2026-11-21", "07:00"); // Contoh jam disesuaikan untuk Akad
      endDate = convertToCalendarUTC("2026-11-21", "10:00");
    }
    const title = `${eventName} - ${groomAndBride}`;
    const dateWedding = "Sabtu, 21 November 2026";
    const details =
      `Kepada Yth. ${invitation},\n\n` +
      `Izinkan kami mengundang Saudara/Saudari untuk menghadiri acara pernikahan yang akan kami laksanakan.\n` +
      `Adapun acara yang akan diadakan adalah sebagai berikut :\n\n` +
      `Acara 1\n` +
      `Hari dan Tanggal: ${dateWedding}\n` +
      `Pukul : ${time}\n` +
      `Tempat : ${place}\n\n` +
      `Akan menjadi suatu kehormatan apabila Saudara/Saudari berkenan untuk hadir.\n\n` +
      `Salam\n\n`;
    const calendarUrl = new URL(
      "https://calendar.google.com/calendar/u/0/r/eventedit",
    );
    calendarUrl.searchParams.append("text", `${title}`);
    calendarUrl.searchParams.append("dates", `${startDate}/${endDate}`);
    calendarUrl.searchParams.append("details", details);
    calendarUrl.searchParams.append("location", place);
    console.log(calendarUrl.toString());
    window.open(calendarUrl.toString(), "_blank");
  };

  // Fungsi untuk Tombol Lokasi
  const handleLocationClick = () => {
    const link= "https://www.google.com/maps/place/Masjid+Al+Ikhlas/@-7.6645507,114.0027885,17z/data=!4m6!3m5!1s0x2dd72ed94e985901:0x76ca118691a9e858!8m2!3d-7.664551!4d114.0061589!16s%2Fg%2F11f5j2d1p2?entry=tts&g_ep=EgoyMDI2MDgxOS4wIPu8ASoASAFQAw%3D%3D&skid=2abc972c-12a7-4ed8-b15c-6198cb22b55b"
    window.open(link, "_blank");
  };

  const convertToCalendarUTC = (
    dateString: string,
    timeString: string,
  ): string => {
    // 1. Gabungkan tanggal & jam dengan timezone WIB (+07:00)
    // Format input: "YYYY-MM-DD" dan "HH:mm"
    const dateObj = new Date(`${dateString}T${timeString}:00+07:00`);

    // 2. Ambil komponen tanggal & waktu dalam standar UTC
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");
    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

    // 3. Format menjadi YYYYMMDDTHHmmssZ
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  };

  return (
    <section
      ref={eventDetailRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-start bg-light-gray bg-[url('/paper.png')] bg-cover bg-center px-4 pt-8 pb-20 min-[1921px]:justify-center"
    >
      {/* KONTAINER UTAMA */}
      <div className="relative flex w-full max-w-[1100px] flex-col items-center md:mt-14">
        {/* BACKGROUND BINGKAI BUNGA (Aman & Tidak Terpotong) */}
        <div className="pointer-events-none absolute md:top-[47%] left-1/2 hidden aspect-[900/555] w-[95vw] max-w-[950px] -translate-x-1/2 bg-[url('/event-bg.png')] bg-contain bg-top bg-no-repeat md:[@media(min-height:700px)]:block" />

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
              <div className="relative flex aspect-[4/3.6] w-full max-w-[400px] items-center justify-center lg:aspect-[4/3.3]">
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
                  <div className="absolute inset-[1.5px] flex flex-col items-center justify-start bg-light-gray p-4 text-center [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                    {/* ISIAN KONTEN AKAD */}
                    <h3 className="font-rogue-script text-dark-brown mt-2 text-3xl lg:text-5xl">
                      Akad Nikah
                    </h3>
                    <div className="bg-dark-brown my-1 h-[1px] w-12" />
                    <p className="font-viaoda-libre text-dark-brown text-md pt-2 font-normal lg:text-xl">
                      Sabtu, 21 November 2026
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md font-normal lg:text-xl">
                      07.00 - Selesai WIB
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md mt-2 font-bold lg:text-lg">
                      Kediaman Mempelai Wanita
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md mt-2 font-medium lg:text-lg">
                      Kandang Utara Rt.02/RW.07 <br />
                      Ds. Olehan Kec. Situbondo. Kab. Situbondo
                    </p>
                    <div className="relative z-50 mt-2 flex w-full items-center justify-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCalendarClick({
                            eventName: "Akad Nikah",
                            time: "10:00 s.d Selesai WIB",
                          });
                        }}
                      >
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Kalendar</span>
                      </button>
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                        onClick={handleLocationClick}
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
              <div className="relative flex aspect-[4/3.6] w-full max-w-[400px] items-center justify-center lg:aspect-[4/3.3]">
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
                  <div className="absolute inset-[1.5px] flex flex-col items-center justify-start bg-light-gray p-4 text-center [clip-path:polygon(13%_0,86%_0,100%_50%,87%_100%,14%_100%,0%_50%)]">
                    {/* ISIAN KONTEN AKAD */}
                    <h3 className="font-rogue-script text-dark-brown mt-2 text-3xl lg:text-5xl">
                      Resepsi
                    </h3>
                    <div className="bg-dark-brown my-1 h-[1px] w-12" />
                    <p className="font-viaoda-libre text-dark-brown text-md pt-2 font-normal lg:text-xl">
                      Sabtu, 21 November 2026
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md font-normal lg:text-xl">
                      13.00 - Selesai WIB
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md mt-2 font-bold lg:text-lg">
                      Kediaman Mempelai Wanita
                    </p>
                    <p className="font-viaoda-libre text-dark-brown text-md mt-2 font-medium lg:text-lg">
                      Kandang Utara Rt.02/RW.07 <br />
                      Ds. Olehan Kec. Situbondo. Kab. Situbondo
                    </p>
                    <div className="relative z-50 mt-2 flex w-full items-center justify-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCalendarClick({
                            eventName: "Resepsi",
                            time: "13:00 s.d Selesai WIB",
                          });
                        }}
                      >
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Kalendar</span>
                      </button>
                      <button
                        type="button"
                        className="bg-dark-brown font-viaoda-libre flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm text-white shadow-md transition hover:scale-105 active:scale-95 sm:px-6 sm:text-base"
                        onClick={handleLocationClick}
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
