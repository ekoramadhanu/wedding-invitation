import React from "react";

interface WeddingCoupleProps {
  weddingCoupleRef: React.RefObject<HTMLElement | null>;
}

export default function WeddingCouple({
  weddingCoupleRef,
}: WeddingCoupleProps) {
  return (
    <section
      ref={weddingCoupleRef}
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[url('/paper.png')]"
    >
      {/* TITLE */}
      <div className="flex justify-center">
        <div className="flex max-w-[730px] flex-col py-10">
          <p className="font-rogue-script text-muted-brown text-center text-6xl font-light">
            Mempelai
          </p>
          <p className="font-viaoda-libre text-muted-brown mt-6 mb-12 px-8 text-center text-xl">
            QS. Ar-Rum : 21 <br />
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar
            terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir"
          </p>
          <div className="w-full">
            <div className="grid grid-cols-12 sm:gap-14">
              {/* PRIA */}
              <div className="col-span-12 flex items-center justify-center sm:col-span-6">
                <div className="flex flex-col ">
                  <div className="mx-auto relative flex h-[280px] w-[260px] items-center justify-center md:h-[320px] md:w-[300px]">
                    {/* 1. BUNGA KIRI ATAS */}
                    <div className="md: pointer-events-none absolute top-[+5%] top-[+10%] left-[-20%] z-20 h-[200px] w-[200px] bg-[url('/bride-flower-1.png')] bg-contain bg-center bg-no-repeat md:left-[-15%]" />
                    {/* 2. HEKSAGON BELAKANG (Pointy-Topped */}
                    <div className="absolute z-0 h-[231px] w-[200px] bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] md:h-[265px] md:w-[230px]">
                      <div className="absolute inset-[1.5px] bg-[#F9F8F6] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                    </div>

                    {/* 3. HEKSAGON DEPAN (Flat-Topped */}
                    <div className="absolute z-10 h-[199px] w-[230px] bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] md:h-[225px] md:w-[260px]">
                      <div className="absolute inset-[2px] overflow-hidden [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]">
                        <img src="/IMG_9688.JPG" alt="Mempelai Pria" />
                      </div>
                    </div>

                    {/* 4. BUNGA KANAN BAWAH */}
                    <div className="pointer-events-none absolute right-[-5%] bottom-[+8%] z-20 h-[200px] w-[200px] bg-[url('/bride-flower-2.png')] bg-contain bg-center bg-no-repeat" />
                  </div>
                  <div>
                    <p className="font-rogue-script mb-3 text-center text-4xl font-light">
                      Eko Ramadhanu Aryputra, S.kom
                    </p>
                    <p className="font-viaoda-libre mb-3 text-center text-lg">
                      Putra dari
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      Alm. Bapak Ari Kusbiantoro
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      &amp;
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      Ibu Indun Susanti
                    </p>
                  </div>
                </div>
              </div>

              {/* WANITA */}
              <div className="col-span-12 flex items-center justify-center sm:col-span-6">
                <div className="flex flex-col">
                  <div className="mx-auto relative flex h-[280px] w-[260px] items-center justify-center md:h-[320px] md:w-[300px]">
                    {/* 1. BUNGA KIRI ATAS */}
                    <div className="pointer-events-none absolute right-[-20%] bottom-[+20%] z-20 h-[200px] w-[200px] -scale-x-100 bg-[url('/bride-flower-1.png')] bg-contain bg-center bg-no-repeat md:right-[-15%] md:bottom-[+30%]" />
                    {/* 1. HEKSAGON BELAKANG (Pointy-Topped */}
                    <div className="absolute z-0 h-[231px] w-[200px] bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] md:h-[265px] md:w-[230px]">
                      <div className="absolute inset-[1.5px] bg-[#F9F8F6] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]" />
                    </div>

                    {/* 2. HEKSAGON DEPAN (Flat-Topped */}
                    <div className="absolute z-10 h-[199px] w-[230px] bg-gradient-to-r from-[#BF9D82] to-[#FAD4AF] [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] md:h-[225px] md:w-[260px]">
                      <div className="absolute inset-[2px] overflow-hidden [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]">
                        <img src="/IMG_9695.JPG" alt="Mempelai Pria" />
                      </div>
                    </div>

                    {/* 4. BUNGA KANAN BAWAH */}
                    <div className="pointer-events-none absolute top-[+30%] left-[-8%] z-20 h-[200px] w-[200px] -scale-x-100 bg-[url('/bride-flower-2.png')] bg-contain bg-center bg-no-repeat" />
                  </div>

                  <div>
                    <p className="font-rogue-script mb-3 text-center text-4xl font-light">
                      Susanti, S.Tr.Kom.
                    </p>
                    <p className="font-viaoda-libre mb-3 text-center text-lg">
                      Putri dari
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      Bapak Mohammad Suharda
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      &amp;
                    </p>
                    <p className="font-viaoda-libre text-center text-lg font-bold">
                      Ibu Watini
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
