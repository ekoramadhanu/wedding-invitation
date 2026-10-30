"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import WeddingCover from "./_components/WeddingCover";
import DataNotfound from "./_components/DataNotfound";
import AOSInit from "./_components/AOSInit";
import LandingPage, {
  LandingPageRef,
} from "./_components/LandingPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { createClient } from "@/lib/supabaseClient";


function WeddingPage() {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const supabase = createClient();
  const searchParams = useSearchParams();

  const invitation =
    searchParams.get("invitation") || "Wedding Invitation";

  const [isOpen, setIsOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isGuestFound, setIsGuestFound] = useState(false);
  const landingPageRef = useRef<LandingPageRef>(null);

  const isGuardActive = useRef(false);

  const handleOpenInvitation = async () => {
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(
          "/music/Glenn_Madeiro_-_Nothing_s_Gonna_Change_My_Love_For_You_(mp3.pm).mp3"
        );

        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
      }

      await audioRef.current.play();
    } catch (error) {
      console.error("Gagal memainkan musik:", error);
    }

    setIsOpen(true);

    isGuardActive.current = true;

    window.history.pushState(
      { weddingInvitation: true },
      "",
      window.location.href
    );
  };

  useEffect(() => {
    let active = true;

    async function checkGuest() {
      setIsChecking(true);

      if (!invitation) {
        setIsGuestFound(false);
        setIsChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("wedding_mst_invitation")
          .select("name")
          .eq("name", invitation)
          .maybeSingle();

        console.log(data);

        if (!active) return;

        if (error) {
          setIsGuestFound(false);
        } else {
          setIsGuestFound(data != null);
        }
      } catch (error) {
        if (active) {
          setIsGuestFound(false);
        }
      } finally {
        if (active) {
          setIsChecking(false);
        }
      }
    }

    checkGuest();

    return () => {
      active = false;
    };
  }, [invitation, supabase]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      AOS.refreshHard();
      AOS.refresh();
    }, 500);

    const handlePopState = () => {
      if (!isGuardActive.current) return;

      window.history.go(1);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  return (
    <>
      <AOSInit />
      {isChecking ? (
        <div className="flex min-h-screen flex-col items-center justify-center gap-5">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <div className="absolute h-full w-full animate-spin rounded-full border-4 border-dark-brown border-t-dark-brown" />

            <span className="animate-pulse text-3xl text-dark-brown">
              ♥
            </span>
          </div>

          <p className="animate-pulse text-sm tracking-widest text-dark-brown">
            MEMERIKSA UNDANGAN...
          </p>
        </div>
      ) : isGuestFound ? (
        !isOpen ? (
          <WeddingCover
            invitation={invitation}
            onOpen={handleOpenInvitation}
          />
        ) : (
          <LandingPage
            ref={landingPageRef}
            invitation={invitation}
            audio={audioRef.current}
          />
        )
      ) : (
        <DataNotfound />
      )}


    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <WeddingPage />
    </Suspense>
  );
}