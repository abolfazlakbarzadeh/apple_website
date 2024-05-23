import {
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import React, { Suspense } from "react";
import Lights from "./Lights";
import IPhone from "./IPhone";
import * as THREE from "three";
import Loader from "./Loader";

const ModelView = ({
  index,
  groupRef,
  setRotationState,
  gsapView,
  controlRef,
  model,
  size,
}: any) => {
  return (
    <View
      index={index}
      id={gsapView}
      className={`w-full h-full absolute ${index == 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          const rotation = controlRef.current.getAzimuthalAngle();
          setRotationState(rotation);
        }}
      />
      <group ref={groupRef} name={index == 1 ? "small" : "large"}>
        <Lights />
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index == 1 ? [15, 15, 15] : [17, 17, 17]}
            size={size}
            model={model}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
