import { Mail } from "lucide-react";

type WeddingCoverProps = {
  invitation: string;
  onOpen: () => void;
};

export default function WeddingCover({
  invitation,
  onOpen,
}: WeddingCoverProps) {
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* FIRST TIME */}
      <div className="relative flex min-h-screen w-full items-center justify-center bg-[url('/paper.png')] bg-cover bg-center bg-no-repeat px-4" >
        {/* FRAME CONTAINER */}
        <div className="relative aspect-[630/555] w-full max-w-[630px]" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
          {/* FRAME */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/cover-frame.png')] bg-contain bg-center bg-no-repeat" />

          {/* FLOWER KIRI ATAS */}
          <div className="pointer-events-none absolute top-[-8%] left-[-5%] z-20 aspect-[279/443] w-[55%] bg-[url('/cover-flower.png')] bg-contain bg-left-top bg-no-repeat" />

          {/* CONTENT */}
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-[25%]">
            <p className="font-viaoda-libre text-dark-brown mb-2 text-center text-xs font-thin sm:mb-4 sm:text-lg md:text-2xl" data-aos="zoom-in" data-aos-delay="500">
              you are invited to our wedding
            </p>

            <p className="font-rogue-script text-dark-brown mb-2 px-2 text-center text-4xl font-light sm:text-5xl md:text-6xl" data-aos="zoom-in" data-aos-delay="500">
              Eko & Susan
            </p>

            <p className="font-viaoda-libre text-dark-brown text-center text-sm font-normal sm:text-lg md:text-2xl" data-aos="zoom-in" data-aos-delay="500">
              Sabtu, 21 November 2026
            </p>

            {/* RECIPIENT */}
            <div className="font-viaoda-libre my-2 flex w-full max-w-[280px] flex-col items-center rounded-xl bg-white px-3 py-2 sm:my-5" data-aos="zoom-in" data-aos-delay="500">
              <p className="text-dark-brown text-xs sm:text-sm">Kepada Yth.</p>

              <p className="text-dark-brown text-xs sm:text-sm">
                Bpk/Ibu/Saudara/i.
              </p>

              <p className="text-dark-brown my-1 text-base font-bold sm:text-xl">
                {invitation}
              </p>

              <p className="text-dark-brown text-xs sm:text-sm">di Tempat</p>
            </div>

            {/* MOBILE */}
            {/* <button
              type="button"
              onClick={onOpen}
              className="bg-dark-brown relative z-50 flex  items-center justify-center rounded-full text-white shadow-md transition hover:scale-105 active:scale-95 sm:hidden"
            >
              Buka Undangan
            </button> */}

            {/* DESKTOP / TABLET */}
            <button
              type="button"
              onClick={onOpen}
              className="bg-dark-brown font-viaoda-libre relative z-50  items-center gap-2 rounded-full px-6 py-2 text-lg text-white shadow-md transition hover:scale-105 active:scale-95 flex"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              <Mail size={22} strokeWidth={1.5} className="mx-1" />
              <span className="hidden md:flex"> Buka Undangan </span>
              <span className="flex md:hidden"> Buka  </span>
            </button>
          </div>

          {/* FLOWER KANAN BAWAH */}
          <div className="pointer-events-none absolute right-[-5%] bottom-[-14%] z-20 aspect-[279/443] w-[55%] bg-[url('/cover-flower-2.png')] bg-contain bg-right-bottom bg-no-repeat" />
        </div>
      </div>
    </div>
  );
}
