import { explore1Img, explore2Img, exploreVideo } from "@/utils";
import { animateWithGSAP } from "@/utils/animate";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
import React, { useRef } from "react";

const Features = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to("#explore_video", {
      scrollTrigger: {
        trigger: "#explore_video",
        toggleActions: "play pause reverse restart",
        start: "-10% bottom",
      },
      onComplete() {
        videoRef.current?.play();
      },
    });

    animateWithGSAP("#features_title", {
      opacity: 1,
      y: 0,
    });
    animateWithGSAP(
      ".g_grow",
      {
        scale: 1,
        opacity: 1,
        ease: "power1 ",
      },
      {
        scrub: 5.5,
      }
    );
    animateWithGSAP(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="h-full bg-zinc overflow-hidden relative common-padding">
      <div className="screen-max-width">
        <div className="w-full mb-12">
          <h1 id="features_title" className="section-heading">
            Explore the full story.
          </h1>
        </div>
        <div className="flex-center flex-col overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl md:text-7xl font-semibold">iPhone</h2>
            <h2 className="text-5xl md:text-7xl font-semibold">
              Forged in titanium.
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10">
            <div className="relative flex items-center h-[50vh] w-full">
              <video
                playsInline
                autoPlay
                muted
                id="explore_video"
                className="pointer-events-none w-full h-full object-center object-cover"
                preload="nonde"
                ref={videoRef}
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col relative w-full">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore1Img}
                    alt="titanium"
                    className="feature-video g_grow"
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img
                    src={explore2Img}
                    alt="titanium2"
                    className="feature-video g_grow"
                  />
                </div>
              </div>
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <div className="feature-text g_text">
                    iPhone 15 Pro is{" "}
                    <span className="text-white">
                      the first iPhone to feature an aerospace-grade titanium
                      design,
                    </span>{" "}
                    using the same alloy that spacecrafts use for missions to
                    Mars.
                  </div>
                </div>
                <div className="flex-1 flex-center">
                  <div className="feature-text g_text">
                    Titanium has the one of the best strength-to-weight ratios
                    of any metal, making these are{" "}
                    <span className="text-white">
                      lightest Pro models ever.
                    </span>{" "}
                    You'll notice the different the moment you pick one up.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
