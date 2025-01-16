import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-3">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://danysantos.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        By Dany Santos →
      </a>
    </footer>
  );
};

export default Footer;
