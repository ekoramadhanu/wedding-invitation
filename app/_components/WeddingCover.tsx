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
              z-40
              flex
              flex-col
              items-center
              justify-center
              px-[25%]
            "
          >

            <p className="mb-2 text-center font-viaoda-libre text-xs font-thin text-dark-brown sm:mb-4 sm:text-lg md:text-2xl">
              you are invited to our wedding
            </p>

            <p className="mb-2 px-2 text-center font-rogue-script text-4xl font-light text-dark-brown sm:text-5xl md:text-6xl">
              Eko & Susan
            </p>

            <p className="text-center font-viaoda-libre text-sm font-normal text-dark-brown sm:text-lg md:text-2xl">
              Sabtu, 21 November 2026
            </p>

            {/* RECIPIENT */}
            <div className="my-2 flex w-full max-w-[280px] flex-col items-center rounded-xl bg-white px-3 py-2 font-viaoda-libre sm:my-5">

              <p className="text-xs text-dark-brown sm:text-sm">
                Kepada Yth.
              </p>

              <p className="text-xs text-dark-brown sm:text-sm">
                Bpk/Ibu/Saudara/i.
              </p>

              <p className="my-1 text-base font-bold text-dark-brown sm:text-xl">
                {invitation}
              </p>

              <p className="text-xs text-dark-brown sm:text-sm">
                di Tempat
              </p>

            </div>

            {/* MOBILE */}
            <button
              type="button"
              onClick={onOpen}
              className="
                relative
                z-50
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-dark-brown
                text-white
                shadow-md
                transition
                hover:scale-105
                active:scale-95
                sm:hidden
              "
            >
              <Mail size={22} strokeWidth={1.5} />
            </button>

            {/* DESKTOP / TABLET */}
            <button
              type="button"
              onClick={onOpen}
              className="
                relative
                z-50
                hidden
                items-center
                gap-2
                rounded-full
                bg-dark-brown
                px-6
                py-2
                font-viaoda-libre
                text-lg
                text-white
                shadow-md
                transition
                hover:scale-105
                active:scale-95
                sm:flex
              "
            >
              Buka Undangan
            </button>

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
    </div>
  );
}