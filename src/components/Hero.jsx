import { Canvas } from "@react-three/fiber";
import Pokedex from "./Pokedex";
import { Suspense, useState } from "react";
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import "../index.css";

const Hero = () => {
    const [scale, setScale] = useState(25)
  return (
    <section className="w-[100vw] h-[100vh] bg-gray-200">
    
      <Canvas className="w-full  bg-blue-100 hero-section">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={70} />
        {/* <OrbitControls /> */}
        <Suspense fallback={<Html center>Loading...</Html>}>
        <Pokedex
            scale={25}
            
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Hero;
