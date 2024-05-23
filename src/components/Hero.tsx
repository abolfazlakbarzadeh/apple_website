import { heroVideo, smallHeroVideo } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState<string>(
    window.matchMedia("(max-width: 760px)").matches ? smallHeroVideo : heroVideo
  );

  const watchHeroVideoSize = () => {
    setVideoSrc(
      window.matchMedia("(max-width: 760px)").matches
        ? smallHeroVideo
        : heroVideo
    );
  };

  useEffect(() => {
    window.addEventListener("resize", watchHeroVideoSize);
    return () => {
      window.removeEventListener("resize", watchHeroVideoSize);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero-text", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  return (
    <section className="relative bg-black nav-height w-full">
      <div className="h-5/6 w-full flex flex-col flex-center">
        <p id="hero-text" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay
            muted
            playsInline
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
