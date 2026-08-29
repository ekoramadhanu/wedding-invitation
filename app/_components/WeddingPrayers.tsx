"use client";

import React, { useState, useEffect } from "react";
import {
  Send,
  Gift,
  QrCode,
  Copy,
  Check,
  X,
  MapPin,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabaseClient";

interface WeddingPrayersProps {
  WeddingPrayersRef: React.RefObject<HTMLElement | null>;
  invitation: string;
}

interface Wish {
  id: number;
  name: string;
  ucapan: string;
}

export default function WeddingCouple({
  WeddingPrayersRef,
  invitation,
}: WeddingPrayersProps) {
  const supabase = createClient();
  const [name, setName] = useState(invitation || "");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const giftAccounts = [
    {
      bank: "Bank Mandiri",
      name: "Ucok Fernando",
      accountNumber: "123000098",
    },
    {
      bank: "OVO",
      name: "Ucok Fernando",
      accountNumber: "787878000",
    },
    {
      bank: "Bank BCA",
      name: "Butet Fransiska",
      accountNumber: "6788231000",
    },
  ];

  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [attendeesCount, setAttendeesCount] = useState<number>(1);
  const [isLoadingUcapan, setIsLoadingUcapan] = useState(false);

  const eventsList = [
    {
      id: "acara-1",
      title: "Akad Nikah (Intimate)",
      date: "Sabtu, 21 November 2026",
      time: "07.00 - 09.00 WIB",
      isDisabled: true,
    },
    {
      id: "acara-2",
      title: "Resepsi",
      date: "Sabtu, 21 November 2026",
      time: "13.00 - Selesai WIB",
      isDisabled: false,
    },
  ];

  const [wishes, setWishes] = useState<Wish[]>([]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const fetchUcapan = async () => {
    const { data, error } = await supabase
      .from("wedding_mst_ucapan")
      .select("id, name, ucapan, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data ucapan:", error.message);
      return;
    }

    if (data) {
      setWishes(data);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newErrors: { name?: string; message?: string } = {};

  //   if (!name.trim()) {
  //     newErrors.name = "Nama wajib diisi.";
  //   }
  //   if (!message.trim()) {
  //     newErrors.message = "Pesan wajib diisi.";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   setErrors({});

  //   setIsLoadingUcapan(true);

  //   try {
  //     const { data, error } = await supabase
  //       .from("wedding_mst_ucapan") // Ganti dengan nama tabel Anda di Supabase
  //       .insert([
  //         {
  //           name: name.trim(),
  //           ucapan: message.trim(),
  //         },
  //       ]); // Mengembalikan data yang baru saja dimasukkan (termasuk id & created_at dari database)
  //   } catch (err) {
  //     console.log("Gagal menyimpan ucapan:", err.message);
  //     setErrors({ message: "Gagal mengirim pesan. Coba lagi nanti." });
  //     return;
  //   }

  //   fetchUcapan();
  //   setMessage("");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; message?: string } = {};
    if (!name.trim()) {
      newErrors.name = "Nama wajib diisi.";
    }
    if (!message.trim()) {
      newErrors.message = "Pesan wajib diisi.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // 1. Aktifkan status loading
    setIsLoadingUcapan(true);

    try {
      const { error } = await supabase.from("wedding_mst_ucapan").insert([
        {
          name: name.trim(),
          ucapan: message.trim(),
        },
      ]);

      if (error) {
        alert("Gagal mengirim ucapan: " + error.message);
      } else {
        setMessage("");
        fetchUcapan();
      }
    } catch (err) {
      console.error(err);
    } finally {
      // 2. Matikan status loading (baik sukses maupun gagal)
      setIsLoadingUcapan(false);
    }
  };

  const toggleEventSelection = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId],
    );
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("RSVP Data:", { selectedEvents, attendeesCount });
    setIsRsvpModalOpen(false);
  };

  useEffect(() => {
    fetchUcapan();
  }, []);

  return (
    <section
      ref={WeddingPrayersRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-start bg-[url('/paper.png')] bg-cover bg-center px-4 pt-8 pb-20 min-[1921px]:justify-center"
    >
      <div className="flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-4">
        <h2 className="font-rogue-script text-muted-brown mb-8 text-center text-5xl font-light sm:text-6xl">
          Doa &amp; Ucapan
        </h2>

        {/* CONTAINER WRAPPER UTAMA */}

        <div className="relative flex aspect-[4/3.6] w-full max-w-[850px] items-center justify-center lg:aspect-[4/3.3]">
          {/* 1. LAYER BASE: HEXAGON SEGI-6 */}
          <div className="relative z-10 h-full w-full bg-gradient-to-r from-[#bf9d82] to-[#fad4af] p-[2px] shadow-sm [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0%_50%)] sm:[clip-path:polygon(14%_0,86%_0,100%_50%,87%_100%,13%_100%,0%_50%)]">
            {/* INNER WHITE CONTENT AREA */}
            <div className="flex h-full w-full justify-center bg-white px-10 py-8 [clip-path:polygon(12%_0,88%_0,100%_50%,88%_100%,12%_100%,0%_50%)] sm:px-16 sm:py-12 sm:[clip-path:polygon(14%_0,86%_0,100%_50%,87%_100%,13%_100%,0%_50%)] md:px-25">
              {/* WRAPPER KONTEN */}
              <div className="flex w-full max-w-[250px] flex-col justify-around md:max-w-[600px]">
                {/* FORM INPUT */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col py-2 sm:py-6"
                >
                  {/* Input Nama */}
                  <div className="flex flex-col gap-0.5 text-left sm:gap-1">
                    <label className="font-rogue-script text-muted-brown text-xl md:text-3xl">
                      Nama :
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={`font-viaoda-libre text-muted-brown w-full border-b bg-transparent py-0.5 text-base font-normal focus:outline-none sm:py-1 sm:text-xl ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#6e4e42]"
                      }`}
                    />
                    {errors.name && (
                      <span className="font-viaoda-libre mt-1 text-xs text-red-500 sm:text-base">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Input Pesan */}
                  <div className="mt-2 flex flex-col text-left sm:mt-4">
                    <label className="font-rogue-script text-muted-brown text-xl md:text-3xl">
                      Pesan untuk Mempelai :
                    </label>
                    <textarea
                      rows={1}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message)
                          setErrors((prev) => ({
                            ...prev,
                            message: undefined,
                          }));
                      }}
                      /* h-[24px] untuk 1 baris di HP, md:h-[56px] untuk 2 baris di MD ke atas */
                      className={`font-viaoda-libre text-muted-brown h-[24px] w-full resize-none border-none bg-transparent bg-[linear-gradient(transparent_23px,#d1d5db_1px)] bg-[size:100%_24px] text-base leading-[24px] focus:outline-none sm:bg-[linear-gradient(transparent_27px,#d1d5db_1px)] sm:bg-[size:100%_28px] sm:text-xl sm:leading-[28px] md:h-[56px] ${
                        errors.message
                          ? "bg-[linear-gradient(transparent_23px,#ef4444_1px)] sm:bg-[linear-gradient(transparent_27px,#ef4444_1px)]"
                          : ""
                      }`}
                    />
                    {errors.message && (
                      <span className="font-viaoda-libre mt-1 text-xs text-red-500 sm:text-base">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:gap-2.5">
                    <button
                      type="submit"
                      className="bg-muted-brown flex w-full items-center justify-center gap-2 rounded py-1.5 text-xs font-semibold tracking-wider text-white uppercase shadow-sm transition-colors hover:bg-[#5a3f35] sm:py-2 sm:text-base"
                    >
                      {isLoadingUcapan ? (
                        <>
                          {/* animate-spin membuat ikon berputar */}
                          <span>Mengirim </span>
                          <Loader2 className="h-3 w-3 animate-spin fill-current sm:h-3.5 sm:w-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Kirim </span>
                          <Send className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRsvpModalOpen(true)}
                      className="border-muted-brown text-muted-brown hover:bg-muted-brown/5 flex w-full items-center justify-center gap-2 rounded border bg-transparent py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors sm:py-2 sm:text-base"
                    >
                      <QrCode className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> RSVP /
                      Kehadiran
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsGiftModalOpen(true)}
                      className="border-muted-brown text-muted-brown hover:bg-muted-brown/5 flex w-full items-center justify-center gap-2 rounded border bg-transparent py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors sm:py-2 sm:text-base"
                    >
                      <Gift className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> hadiah
                    </button>
                  </div>
                </form>

                {/* UCAPAN PENUTUP */}
                <div className="mt-2 flex flex-col text-left sm:mt-4 sm:gap-1.5">
                  <p className="font-rogue-script text-muted-brown xs:text-base text-sm leading-tight italic sm:text-3xl sm:leading-relaxed">
                    Atas doa &amp; ucapan bapak/ibu/saudara/i, Kami mengucapkan
                    terima kasih.
                  </p>
                  <p className="font-rogue-script text-muted-brown xs:text-base mt-1 text-sm sm:mt-0 sm:text-3xl">
                    Salam
                  </p>
                  <h3 className="font-viaoda-libre text-muted-brown xs:text-sm text-xs font-bold italic sm:text-xl">
                    Eko &amp; Susan
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* test */}
        {/* <div className="xs:max-w-[420px] relative min-h-[350px] w-full max-w-[360px] sm:aspect-[6/5] sm:min-h-0 sm:max-w-[850px] md:min-h-[520px]"></div> */}

        <div className="mt-25 w-full max-w-[850px] max-height-[500px] rounded-3xl bg-[#dbe3e6]/60 p-6 backdrop-blur-xs sm:p-10">
          <h3 className="font-rogue-script text-muted-brown mb-6 text-left text-3xl sm:text-4xl">
            Doa &amp; Ucapan dari undangan
          </h3>

          <div className="flex max-h-[500px] flex-col gap-4 overflow-y-auto pr-1">
            {wishes.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-2xl bg-white/90 p-5 text-left shadow-xs"
              >
                <h4 className="font-serif text-lg font-bold text-[#5c4a3e]">
                  {item.name}
                </h4>
                <p className="mt-1 font-serif text-sm leading-relaxed text-[#78695f]">
                  {item.ucapan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL KADO DIGITAL */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
            {/* Tombol Close Lingkaran Merah */}
            <button
              onClick={() => setIsGiftModalOpen(false)}
              className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#b83b3b] font-sans text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title Modal */}
            <h3 className="mb-5 text-left font-serif text-2xl font-bold text-[#5c727d]">
              BANK / E - WALLET TRANSFER
            </h3>

            {/* List Rekening */}
            <div className="max-h-[450px] space-y-4 overflow-y-auto pr-1">
              {giftAccounts.map((account, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-100 bg-white p-4 text-left shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                >
                  <p className="font-serif text-[10px] tracking-widest text-gray-400 uppercase">
                    BANK / NAMA REKENING
                  </p>
                  <p className="font-serif text-base text-[#5c727d]">
                    {account.bank} / {account.name}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-[10px] tracking-widest text-gray-400 uppercase">
                        NOMOR REKENING
                      </p>
                      <p className="font-serif text-base text-[#5c727d]">
                        {account.accountNumber}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(account.accountNumber, index)}
                      className="p-1.5 text-gray-500 transition-colors hover:text-gray-800"
                      title="Salin Nomor Rekening"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {/* Title Modal */}
              <h3 className="mb-5 text-left font-serif text-2xl font-bold text-[#5c727d]">
                PENGIRIMAN HADIAH
              </h3>
              <div className="mt-3 rounded-xl border border-gray-100 bg-[#f8f6f6] p-4 text-left">
                <h4 className="font-sans text-sm font-bold text-gray-800 sm:text-base">
                  Kediaman Mempelai Wanita
                </h4>
                <p className="mt-1 font-sans text-xs leading-relaxed text-gray-600 sm:text-sm">
                  Kandang Utara Rt.02/RW.07 <br />
                  Ds. Olehan Kec. Situbondo. Kab. Situbondo, Jawa Timur <br />
                  Indonesia
                </p>

                {/* Action Buttons Alamat */}
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() =>
                      handleCopy(
                        " Kandang Utara Rt.02/RW.07 Ds. Olehan Kec. Situbondo. Kab. Situbondo, Jawa Timur Indonesia",
                        999,
                      )
                    }
                    className="flex items-center justify-center gap-1.5 rounded bg-[#800020] px-3 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#600018] sm:text-xs"
                  >
                    {copiedIndex === 999 ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> COPY ADDRESS
                      </>
                    )}
                  </button>

                  <a
                    href="https://www.google.com/maps/place/Masjid+Al+Ikhlas/@-7.6645507,114.0027885,17z/data=!4m6!3m5!1s0x2dd72ed94e985901:0x76ca118691a9e858!8m2!3d-7.664551!4d114.0061589!16s%2Fg%2F11f5j2d1p2?entry=tts&g_ep=EgoyMDI2MDgxOS4wIPu8ASoASAFQAw%3D%3D&skid=2abc972c-12a7-4ed8-b15c-6198cb22b55bm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded border border-[#e5d5d5] bg-white px-3 py-2 text-[10px] font-bold tracking-wider text-gray-800 uppercase transition-colors hover:bg-gray-50 sm:text-xs"
                  >
                    <MapPin className="h-3.5 w-3.5 text-gray-700" /> OPEN MAPS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RSVP */}
      {isRsvpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
            {/* Header Modal: Title & Tombol Close Lingkaran Krem */}
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-3xl font-bold text-[#324552]">
                RSVP
              </h3>
              <button
                onClick={() => setIsRsvpModalOpen(false)}
                className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#b83b3b] font-sans text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleRsvpSubmit} className="mt-4 text-left">
              <p className="font-serif text-sm text-gray-500">
                Silahkan pilih acara yang akan dihadiri :
              </p>

              {/* List Acara Checkbox */}
              <div className="mt-3 space-y-3">
                {eventsList.map((evt) => {
                  // Memastikan selectedEvents selalu dianggap array agar tidak crash
                  const isChecked =
                    Array.isArray(selectedEvents) &&
                    selectedEvents.includes(evt.id);

                  return (
                    <label
                      key={evt.id}
                      className="flex cursor-pointer items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all hover:border-gray-200"
                    >
                      <div className="mt-1">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleEventSelection(evt.id)}
                          className="h-5 w-5 rounded border-gray-300 text-[#4a2e05] focus:ring-[#4a2e05]"
                          disabled={evt.isDisabled}
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-normal text-gray-800">
                          {evt.title}
                        </h4>
                        <p className="mt-0.5 font-serif text-xs tracking-widest text-gray-400 uppercase">
                          {evt.date}
                        </p>
                        <p className="font-serif text-xs tracking-widest text-gray-400 uppercase">
                          {evt.time}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Tombol Konfirmasi */}
              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[#4a2e05] py-3.5 font-sans text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#382304]"
              >
                KONFIRMASI
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
