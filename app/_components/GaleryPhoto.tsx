import React from "react";

interface GaleryPhotoProps {
  GaleryPhotoRef: React.RefObject<HTMLElement | null>;
}

const galleryImages = [
  { id: 1, src: "/DSC_0704_Compress.jpg", alt: "Lamran 1",class:"transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 2, src: "/DSC_0708_compress.jpg", alt: "Lamran 2",class:" transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 3, src: "/IMG_9646_compress.jpg", alt: "Prewedding 1",class:"relative -translate-y-10 transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 4, src: "/IMG_9650_compress.jpg", alt: "Prewedding 2",class:"relative -translate-y-13 transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 5, src: "/IMG_9674_compress.jpg", alt: "Prewedding 3",class:"relative -translate-y-10 transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 6, src: "/IMG_9677_compress.jpg", alt: "Prewedding 4i", class:"relative -translate-y-13 transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 7, src: "/5e8b454c-compress.jpg", alt: "Photobooth 1",class:"h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" },
  { id: 8, src: "/71c8e475-compress.jpg", alt: "Photobooth 2",class:"h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" },
//   { id: 9, src: "/gallery/photo-9.jpg", alt: "Buket Mawar Peach" },
//   { id: 10, src: "/gallery/photo-10.jpg", alt: "Pelukan Pengantin" },
//   { id: 11, src: "/gallery/photo-11.jpg", alt: "Gaun dan Jas Pengantin" },c:\Users\ekora\Downloads\1e8666d3-eaf2-429e-877b-895534dbf0aa.png
//   { id: 12, src: "/gallery/photo-12.jpg", alt: "Kotak Kayu Cincin" },
];

export default function GaleryPhoto({ GaleryPhotoRef }: GaleryPhotoProps) {
  return (
    <section
      ref={GaleryPhotoRef}
      className="bg-light-gray flex min-h-screen w-full flex-col items-center justify-center bg-[url('/paper.png')] py-12 overflow-hidden"
    >
      <div className="flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-4">
        {/* Judul Utama */}
        <h2 className="font-rogue-script text-muted-brown text-center text-5xl font-light sm:text-6xl mb-10">
          Photo galery
        </h2>
        {/* Area Konten Utama */}
        <div className="relative w-full max-w-[1100px] ">
          {/* Hiasan Bunga Kiri Atas */}
          <img
            src="/gallery-flower.png"
            alt="Bunga Kiri Atas"
            className="pointer-events-none absolute -top-8 -left-8 z-20 aspect-square h-auto w-36 object-contain sm:-top-12 sm:-left-12  md:-top-10 md:-left-10 md:w-50"
          />

          {/* Hiasan Bunga Kanan Bawah */}
          <img
            src="/gallery-flower.png"
            alt="Bunga Kanan Bawah"
            className="pointer-events-none rotate-180 absolute -right-8 -bottom-8 z-20 aspect-square h-auto w-36 object-contain sm:-right-12 sm:-bottom-12 sm:w-32 md:-right-10 md:-bottom-10 md:w-50"
          />

          {/* Grid Foto: 2 Kolom (HP), 4 Kolom (Tablet/Desktop) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="group relative aspect-square overflow-hidden rounded-sm bg-gray-100 shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={img.class}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
