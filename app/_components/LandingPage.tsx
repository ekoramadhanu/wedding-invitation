"use client";

import { Pause, Play } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type LandingPageRef = {
  playMusic: () => Promise<void>;
};

const LandingPage = forwardRef<LandingPageRef>(
  function LandingPage(_props, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hari: '00',
        jam: '00',
        menit: '00',
        detik: '00'
    });

    useEffect(() => {
      // =========================
      // MUSIC
      // =========================
      const audio = new Audio(
        "/music/cant-help-falling-in-love.mp3"
      );

      audio.loop = true;
      audio.volume = 0.5;

      audioRef.current = audio;

      // =========================
      // COUNTDOWN
      // =========================
      const targetDate = new Date(
        "November 21, 2026 00:00:00"
      ).getTime();

      const calculateTime = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
          setTimeLeft({
            hari: "00",
            jam: "00",
            menit: "00",
            detik: "00",
          });

          return;
        }

        const d = Math.floor(
          difference / (1000 * 60 * 60 * 24)
        );

        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const m = Math.floor(
          (difference % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const s = Math.floor(
          (difference % (1000 * 60)) / 1000
        );

        setTimeLeft({
          hari: d.toString().padStart(2, "0"),
          jam: h.toString().padStart(2, "0"),
          menit: m.toString().padStart(2, "0"),
          detik: s.toString().padStart(2, "0"),
        });
      };

      // Jalankan pertama kali
      calculateTime();

      // Update setiap 1 detik
      const timer = setInterval(calculateTime, 1000);

      // =========================
      // CLEANUP
      // =========================
      return () => {
        clearInterval(timer);

        audio.pause();
        audio.src = "";
        audioRef.current = null;
      };
    }, []);

    // Fungsi ini bisa dipanggil dari page.jsx
    useImperativeHandle(ref, () => ({
      playMusic: async () => {
        const audio = audioRef.current;

        if (!audio) {
          console.log("Audio belum siap");
          return;
        }

        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Gagal memainkan musik:", error);
        }
      },
    }));

    const toggleMusic = async () => {
      const audio = audioRef.current;

      if (!audio) return;

      if (audio.paused) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Gagal memainkan musik:", error);
        }
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    };

    return (
      <div >
        <div className="relative flex min-h-screen w-full items-center justify-center bg-[url('/paper.png')] bg-cover bg-center bg-no-repeat px-4">

            {/* FRAME CONTAINER */}
            <div className="relative aspect-[630/555] w-full max-w-[630px]">

            {/* FRAME */}
            <div
                className="
                absolute
                inset-0
                z-10
                bg-[url('/cover-frame.png')]
                bg-contain
                bg-center
                bg-no-repeat
                pointer-events-none
                "
            />

            {/* FLOWER KIRI ATAS */}
            <div
                className="
                absolute
                left-[-5%]
                top-[-8%]
                z-20
                aspect-[279/443]
                w-[55%]
                bg-[url('/cover-flower.png')]
                bg-contain
                bg-left-top
                bg-no-repeat
                pointer-events-none
                "
            />

            {/* CONTENT */}
            <div
                className="
                absolute
                inset-0
                z-20
                flex
                flex-col
                items-center
                justify-center
                px-[25%]
                "
            >

                <p className="mb-4 text-center font-viaoda-libre text-xs font-thin text-dark-brown sm:mb-4 sm:text-lg md:text-2xl">
                We are getting married
                </p>

                <p className="mb-4 px-2 text-center font-rogue-script text-4xl font-light text-dark-brown sm:text-5xl md:text-6xl">
                Eko & Susan
                </p>

                <p className="text-center font-viaoda-libre text-sm font-normal text-dark-brown sm:text-lg md:text-2xl">
                Sabtu, 21 November 2026
                </p>
                <p className="text-center font-viaoda-libre text-xs font-thin text-dark-brown sm:text-sm md:text-lg">
                - Save the Date -
                </p>
                {/* Tampilan Countdown */}
                <div className="mb-2 mt-11 grid w-full max-w-[360px] grid-cols-4 gap-2 sm:max-w-[420px] sm:gap-4">
                  {/* HARI */}
                  <div className="flex flex-col items-center">
                    <div className="flex aspect-square w-full items-center justify-center rounded-md border border-muted-brown/30 bg-white/50">
                      <span className="font-viaoda-libre text-2xl font-bold text-muted-brown sm:text-3xl">
                        {timeLeft.hari}
                      </span>
                    </div>

                    <span className="mt-1 text-[9px] tracking-wider text-muted-brown font-semibold font-viaoda-libre sm:text-[10px]">
                      Hari
                    </span>
                  </div>

                  {/* JAM */}
                  <div className="flex flex-col items-center">
                    <div className="flex aspect-square w-full items-center justify-center rounded-md border border-muted-brown/30 bg-white/50">
                      <span className="font-viaoda-libre text-2xl font-bold text-muted-brown sm:text-3xl">
                        {timeLeft.jam}
                      </span>
                    </div>

                    <span className="mt-1 text-[9px] tracking-wider text-muted-brown font-semibold font-viaoda-libre sm:text-[10px]">
                      Jam
                    </span>
                  </div>

                  {/* MENIT */}
                  <div className="flex flex-col items-center">
                    <div className="flex aspect-square w-full items-center justify-center rounded-md border border-muted-brown/30 bg-white/50">
                      <span className="font-viaoda-libre text-2xl font-bold text-muted-brown sm:text-3xl">
                        {timeLeft.menit}
                      </span>
                    </div>

                    <span className="mt-1 text-[9px] tracking-wider text-muted-brown font-semibold font-viaoda-libre sm:text-[10px]">
                      Menit
                    </span>
                  </div>

                  {/* DETIK */}
                  <div className="flex flex-col items-center">
                    <div className="flex aspect-square w-full items-center justify-center rounded-md border border-muted-brown/30 bg-white/50">
                      <span className="font-viaoda-libre text-2xl font-bold text-muted-brown sm:text-3xl">
                        {timeLeft.detik}
                      </span>
                    </div>

                    <span className="mt-1 text-[9px] tracking-wider text-muted-brown font-semibold font-viaoda-libre sm:text-[10px]">
                      Detik
                    </span>
                  </div>
                </div>
                <p className="text-center font-rogue-script text-xs font-thin text-dark-brown sm:text-lg md:text-2xl">
                - E & S -
                </p>
                

               



            </div>

            {/* FLOWER KANAN BAWAH */}
            <div
                className="
                absolute
                bottom-[-14%]
                right-[-5%]
                z-20
                aspect-[279/443]
                w-[55%]
                bg-[url('/cover-flower-2.png')]
                bg-contain
                bg-right-bottom
                bg-no-repeat
                pointer-events-none
                "
            />

            </div>
        </div>
        Mempelai

        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="
            fixed
            bottom-5
            right-5
            z-50
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-olive-gray
            text-white
            shadow-lg
            transition
            hover:scale-105
            active:scale-95
          "
        >
          {isPlaying ? (
            <Pause
              size={20}
              className="fill-white text-white"
            />
          ) : (
            <Play
              size={20}
              className="fill-white text-white"
            />
          )}
        </button>

      </div>
    );
  }
);

export default LandingPage;