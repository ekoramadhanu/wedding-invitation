"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import WeddingCover from "./_components/WeddingCover";
import LandingPage, {
  LandingPageRef,
} from "./_components/LandingPage";

function WeddingPage() {
  const searchParams = useSearchParams();

  const invitation =
    searchParams.get("invitation") || "Wedding Invitation";

  const [isOpen, setIsOpen] = useState(false);
  const landingPageRef = useRef<LandingPageRef>(null);

  const isGuardActive = useRef(false);

  const handleOpenInvitation = async () => {
    console.log("1. BUTTON CLICKED");

    await landingPageRef.current?.playMusic();

    console.log("2. PLAY MUSIC DONE");

    setIsOpen(true);

    console.log("3. IS OPEN SET");

    isGuardActive.current = true;

    window.history.pushState(
      {
        weddingInvitation: true,
      },
      "",
      window.location.href
    );

    console.log("4. HISTORY PUSHED");
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePopState = () => {
      if (!isGuardActive.current) return;

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
        <LandingPage ref={landingPageRef} />
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