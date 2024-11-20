import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";

const Pokedex = (props) => {
  const { nodes, materials } = useGLTF("/assets/pokedex.glb");
  const [pokemonId, setPokemonId] = useState("pikachu");
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await res.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching the Pokemon Data", error);
      }
    };
    fetchData();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemon && materials.Pantallas) {
      console.log(
        "Updating screen texture with sprite URL:",
        pokemon.sprites.front_default
      );
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(pokemon.sprites.front_default, (texture) => {
        materials.Pantallas.map = texture;
        materials.Pantallas.needsUpdate = true;
      });
    }
  }, [pokemon, materials]);

  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.group2polySurface92_Udim0001_0.geometry}
          material={materials.Udim0001}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface44_Udim0002_0.geometry}
          material={materials.Udim0002}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere12_Udim0003_0.geometry}
          material={materials.Udim0003}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.group2polySurface82_Udim0004_0.geometry}
          material={materials.Udim0004}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.polySurface85_Udim0005_0.geometry}
          material={materials.Udim0005}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/assets/pokedex.glb");

export default Pokedex;
