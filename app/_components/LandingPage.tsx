"use client";
import OverviewSection from "./OverviewSection";
import EventDetail from "./EventDetail";
import WeddingCouple from "./WeddingCouple";
import OurLoveStory from "./OurLoveStory";
import { Pause, Play } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";

export type LandingPageRef = {
  playMusic: () => Promise<void>;
};

interface LandingPageProps {
  invitation: string;
}

const LandingPage = forwardRef<LandingPageRef, LandingPageProps>(
  function LandingPage({ invitation }, ref) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
      hari: "00",
      jam: "00",
      menit: "00",
      detik: "00",
    });
    const snowflakes = useMemo(() => {
      return Array.from({ length: 35 }, (_, index) => ({
        id: index,
        // Posisi kiri
        left: (index * 37) % 100,
        // Delay berbeda-beda
        delay: (index * 1.7) % 8,
        // Kecepatan berbeda-beda
        duration: 7 + ((index * 2.3) % 6),
        // Ukuran berbeda-beda
        size: 7 + ((index * 1.3) % 4),
        // Opacity berbeda-beda
        opacity: 0.25 + ((index * 0.17) % 0.45),
      }));
    }, []);
    const [currentBackground, setCurrentBackground] = useState(0);
    const backgrounds = ["/DSC_0704.jpg", "/DSC_0708.jpg", "/IMG_9650.JPG"];
    const overviewRef = useRef<HTMLElement>(null);
    const weddingCoupleRef = useRef<HTMLElement>(null);
    const eventDetailRef = useRef<HTMLElement>(null);
    const ourLoveStoryRef = useRef<HTMLElement>(null);

    useEffect(() => {
      // =========================
      // MUSIC
      // =========================
      const audio = new Audio(
        "/music/Glenn_Madeiro_-_Nothing_s_Gonna_Change_My_Love_For_You_(mp3.pm).mp3",
      );

      audio.loop = true;
      audio.volume = 0.5;

      audioRef.current = audio;

      // =========================
      // COUNTDOWN
      // =========================
      const targetDate = new Date("November 21, 2026 00:00:00").getTime();

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

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));

        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );

        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        const s = Math.floor((difference % (1000 * 60)) / 1000);

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
      // BACKGROUND SLIDESHOW
      // =========================
      const backgroundTimer = setInterval(() => {
        setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
      }, 6000);

      // =========================
      // CLEANUP
      // =========================
      return () => {
        clearInterval(timer);
        clearInterval(backgroundTimer);

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
      <div>
        <OverviewSection
          overviewRef={overviewRef}
          snowflakes={snowflakes}
          backgrounds={backgrounds}
          currentBackground={currentBackground}
          timeLeft={timeLeft}
        />
        <WeddingCouple weddingCoupleRef={weddingCoupleRef} />
        <EventDetail eventDetailRef={eventDetailRef} invitation={invitation}  />
        <OurLoveStory ourLoveStoryRef={ourLoveStoryRef}  />

        

        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="bg-olive-gray fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <Pause size={20} className="fill-white text-white" />
          ) : (
            <Play size={20} className="fill-white text-white" />
          )}
        </button>
      </div>
    );
  },
);

export default LandingPage;
