"use client";
import OverviewSection from "./OverviewSection";
import EventDetail from "./EventDetail";
import WeddingCouple from "./WeddingCouple";
import OurLoveStory from "./OurLoveStory";
import GaleryPhoto from "./GaleryPhoto";
import WeddingPrayers from "./WeddingPrayers";
import { Pause, Play } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

export type LandingPageRef = {
  playMusic: () => Promise<void>;
};

interface LandingPageProps {
  invitation: string;
  audio: HTMLAudioElement | null;
}

const LandingPage = forwardRef<LandingPageRef, LandingPageProps>(
  function LandingPage({ invitation, audio }, ref) {

    const [isPlaying, setIsPlaying] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const [mounted, setMounted] = useState(false);
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
    const backgrounds = ["/DSC_0704_Compress.jpg", "/DSC_0708_compress.jpg"];
    const overviewRef = useRef<HTMLElement>(null);
    const weddingCoupleRef = useRef<HTMLElement>(null);
    const eventDetailRef = useRef<HTMLElement>(null);
    const ourLoveStoryRef = useRef<HTMLElement>(null);
    const GaleryPhotoRef = useRef<HTMLElement>(null);
    const WeddingPrayersRef = useRef<HTMLElement>(null);

    useEffect(() => {
      setMounted(true);
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

      };
    }, []);

    // Fungsi ini bisa dipanggil dari page.jsx
    useImperativeHandle(ref, () => ({
      playMusic: async () => {
        if (!audio) return;

        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Gagal memainkan musik:", error);
        }
      },
    }));

    const toggleMusic = async () => {
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
      <>
        <div>
          <OverviewSection
            overviewRef={overviewRef}
            snowflakes={snowflakes}
            backgrounds={backgrounds}
            currentBackground={currentBackground}
            timeLeft={timeLeft}
          />

          <WeddingCouple weddingCoupleRef={weddingCoupleRef} />
          <EventDetail eventDetailRef={eventDetailRef} invitation={invitation} />
          <OurLoveStory ourLoveStoryRef={ourLoveStoryRef} />
          <GaleryPhoto GaleryPhotoRef={GaleryPhotoRef} />
          <WeddingPrayers WeddingPrayersRef={WeddingPrayersRef} invitation={invitation} />
        </div>

        {mounted &&
          createPortal(
            <button
              type="button"
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="
                !fixed
                !right-[max(16px,env(safe-area-inset-right))]
                !bottom-[max(24px,env(safe-area-inset-bottom))]
                !left-auto
                !top-auto
                z-[999999]
                flex h-12 w-12
                shrink-0
                items-center justify-center
                rounded-full
                bg-olive-gray
                text-white
                shadow-lg
                transition-transform
                hover:scale-105
                active:scale-95
              "
              style={{
                position: "fixed",
                right: "max(16px, env(safe-area-inset-right))",
                bottom: "max(24px, env(safe-area-inset-bottom))",
                left: "auto",
                top: "auto",
                transform: "none",
                margin: 0,
              }}
            >
              {isPlaying ? (
                <Pause size={20} className="fill-white text-white" />
              ) : (
                <Play size={20} className="fill-white text-white" />
              )}
            </button>,
            document.body
          )}
      </>
    );
  },
);

export default LandingPage;
