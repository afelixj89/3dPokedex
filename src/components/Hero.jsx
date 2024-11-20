import { Canvas } from "@react-three/fiber";
import Pokedex from "./Pokedex";
import { Suspense, useEffect, useState } from "react";
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import "../index.css";

const Hero = () => {
  const [scale, setScale] = useState(25);
  const [pokemonId, setPokemonId] = useState("pikachu");
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await res.json();
        setPokemon(data);
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        const speciesData = await speciesRes.json();

        const firstDescription =
          speciesData.flavor_text_entries[0]?.flavor_text.replace(
            /\n|\f/g,
            " "
          );

        setDescription(firstDescription || "Description not available.");
      } catch (error) {
        console.error("Error fetching the Pokemon Data", error);
      }
    };
    fetchData();
  }, [pokemonId]);

  return (
    <section className="w-[100vw] h-[100vh] bg-gray-200">
      <Canvas className="w-full  bg-blue-100 hero-section">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={70} />
        {/* <OrbitControls /> */}
        <Suspense fallback={<Html center>Loading...</Html>}>
          <Pokedex scale={25} />
        </Suspense>
      </Canvas>

      {pokemon && (
        <div
          className="absolute top-[43%] left-[26%] transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{
            width: "200px",
            height: "200px",
            backgroundImage: `url(${pokemon.sprites.front_default})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}

      {pokemon && (
        <>

        <div className="absolute top-[36%] left-[63%] text-center z-10 p-4 bg-transparent w-[245px]">
        <h2 className="text-xl font-bold">{pokemon.name.toUpperCase()}</h2>
        <p className="text-black-500">ID: {pokemon.id}</p>
        </div>
            
       
        <div className="absolute top-[36%] left-[63%] text-center z-10 p-4 bg-transparent w-[245px]">
   
          <p className="text-sm mt-2">{description}</p>
        </div>
        </>
      )}
    </section>
  );
};

export default Hero;
