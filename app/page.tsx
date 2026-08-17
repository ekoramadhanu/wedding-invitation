"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import WeddingCover from "./_components/WeddingCover";
import LandingPage, {
  LandingPageRef,
} from "./_components/LandingPage";

export default function Page() {
  const searchParams = useSearchParams();

  const invitation =
    searchParams.get("invitation") || "Wedding Invitation";

  const [isOpen, setIsOpen] = useState(false);
  const landingPageRef = useRef<LandingPageRef>(null);

  const isGuardActive = useRef(false);

  const handleOpenInvitation = async () => {
     console.log("1. BUTTON CLICKED");
    await landingPageRef.current?.playMusic();
    setIsOpen(true);

    isGuardActive.current = true;

    // HANYA SATU KALI
    window.history.pushState(
      {
        weddingInvitation: true,
      },
      "",
      window.location.href
    );
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = () => {
      if (!isGuardActive.current) return;

      // Browser sudah mundur satu history entry.
      // Kembalikan ke LandingPage.
      window.history.go(1);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isOpen]);

  return (
   <>
      <div className={isOpen ? "hidden" : "block"}>
        <WeddingCover
          invitation={invitation}
          onOpen={handleOpenInvitation}
        />
      </div>

      <div className={isOpen ? "block" : "hidden"}>
        <LandingPage ref={landingPageRef}/>
      </div>
    </>
  );
}