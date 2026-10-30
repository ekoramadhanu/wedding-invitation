import React from "react";
import Image from "next/image";

export default function DataNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/404-error-animate.svg"
        alt="404 Error"
        width={700}
        height={700}
        className="h-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
        priority
      />
    </div>
  );
}