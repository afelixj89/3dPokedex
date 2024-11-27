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
  const [searchInput, setSearchInput] = useState("");

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

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    if(searchInput.trim()) {
      setPokemonId(searchInput.trim().toLocaleLowerCase());
      setSearchInput("");
    }
  }

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

      <div className="absolute top-[10%] left-[50%] transform -translate-x-1/2 z-10 flex space-x-2">
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Enter Pokemon name or ID"
          className="p-2 border rounded-md text-sm"
        ></input>
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-md text-sm"
        ></button>
      </div>

      {pokemon && (
        <div
          className="absolute top-[43%] left-[36%] transform -translate-x-1/2 -translate-y-1/2 z-10"
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
          <div className="absolute top-[66%] left-[23%] text-center z-10 p-1  bg-transparent w-[245px]">
            <h2 className="text-xxxs font-bold">
              {pokemon.name.toUpperCase()}
            </h2>
            <p className="text-black-600 text-xxs">ID: {pokemon.id}</p>
          </div>

          <div className="absolute top-[35.5%] left-[57%] p-4 text-center z-10 bg-transparent w-[245px]  max-h-[90px] overflow-y-scroll">
            <p className="text-xxxs mt-2">{description}</p>
          </div>
        </>
      )}
    </section>
  );
};
//screen sizes missing
export default Hero;
