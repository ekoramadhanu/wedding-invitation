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

    await landingPageRef.current?.playMusic();

    setIsOpen(true);

    isGuardActive.current = true;

    window.history.pushState(
      {
        weddingInvitation: true,
      },
      "",
      window.location.href
    );
  };

  useEffect(() => {
    let active = true;

    async function checkGuest() {
      if (!invitation) {
        setIsGuestFound(false);
        setIsChecking(false);
        return;
      }

      setIsChecking(true);

      const { data, error } = await supabase
        .from("wedding_mst_invitation")
        .select("name")
        .eq("name", invitation)
        .maybeSingle();
        
      console.log(data)
      // console.log(invitation)
      if (!active) return;

      if (error) {
        // console.error("Gagal mengecek tamu:", error.message);
        setIsGuestFound(false);
      } else {
        setIsGuestFound(!!data);
      }

      setIsChecking(false);
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
      <div className={isOpen ? "hidden" : "block"}>
        <WeddingCover
          invitation={invitation}
          onOpen={handleOpenInvitation}
        />
      </div>

      <div className={isOpen ? "block" : "hidden"}>
        <LandingPage ref={landingPageRef} invitation={invitation} />
      </div>
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