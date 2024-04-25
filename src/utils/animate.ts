import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);
export const animateWithGSAP = (
  target: gsap.TweenTarget,
  animationProps: gsap.TweenVars,
  scrollTriggerProps?: ScrollTrigger.Vars
) => {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target as string,
      toggleActions: "restart reverse restart reverse",
      start: "top 85%",
      ...scrollTriggerProps,
    },
  });
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  model: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>,
  rotation: number,
  from: string,
  to: string,
  newState: gsap.TweenVars
) => {
  console.log(model.current.rotation);
  timeline.to(model.current.rotation, {
    y: rotation,
    duration: 1,
    ease: "power2.inOut",
  });

  timeline.to(
    from,
    {
      ...newState,
      ease: "power2.inOut",
    },
    "<"
  );

  timeline.to(
    to,
    {
      ...newState,
      ease: "power2.inOut",
    },
    "<"
  );
};
