import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [loadedData, setLoadedData] = useState<unknown[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    isPlaying: false,
    videoId: 0,
    isLastVideo: false,
  });

  const { isEnd, isLastVideo, isPlaying, startPlay, videoId } = video;

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((video) => ({
          ...video,
          isPlaying: true,
          startPlay: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [isPlaying, videoId, startPlay, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate progress of the video

      gsap.to("#slider", {
        transform: `translateX(${-100 * videoId}%)`,
        duration: 2,
        ease: "power2.inOut",
      });

      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) {
            currentProgress = progress;

            gsap.to(videoDivRef.current[videoId], {
              width: window.matchMedia("(max-width: 1200px)").matches
                ? "10vw"
                : "4vw",
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(videoSpanRef.current[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (process: string, i?: number) => {
    switch (process) {
      case "video-end": {
        setVideo((video) => ({
          ...video,
          isEnd: true,
          videoId: i! + 1,
        }));
        break;
      }
      case "video-last": {
        setVideo((video) => ({
          ...video,
          isLastVideo: true,
        }));
        break;
      }
      case "video-reset": {
        setVideo((video) => ({
          ...video,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      }
      case "play-pause": {
        setVideo((video) => ({
          ...video,
          isPlaying: !video.isPlaying,
        }));
        break;
      }
      default: {
        return video;
      }
    }
  };

  const handleLoadedMetadata = (_: number, e: unknown) =>
    setLoadedData((loadedData) => [...loadedData, e]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div id="slider" className="sm:pr-20 pr-10" key={list.id}>
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline
                  muted
                  preload="auto"
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el!)}
                  onPlay={() => {
                    setVideo((prevState) => ({
                      ...prevState,
                      isPlaying: true,
                    }));
                  }}
                  onEnded={() => {
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last", i);
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p
                    key={`text-${i}`}
                    className="md:text-2xl text-xl font-medium"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <div
              key={i}
              ref={(el) => (videoDivRef.current[i] = el!)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer relative"
            >
              <span
                className="absolute w-full h-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el!)}
              />
            </div>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("video-reset")
              : isPlaying
              ? () => handleProcess("play-pause")
              : () => handleProcess("play-pause")
          }
        >
          <img
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt="controll btn"
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
