import { useGLTF } from "@react-three/drei";


const Pokedex = (props) => {
  const { nodes, materials } = useGLTF("/assets/pokedex.glb");

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
