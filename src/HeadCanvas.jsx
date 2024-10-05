import { useEffect, useRef } from "react"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three";


function Sphere() {
    const texture = useLoader(TextureLoader, "/moon.jpg")
    const meshRef = useRef()
    useFrame(({ clock }) => {
      const elapsed = clock.getElapsedTime()
      meshRef.current.rotation.y = elapsed * 0.5
      const t = Math.min(1, elapsed/2)
      meshRef.current.scale.x = t
      meshRef.current.scale.y = t
      meshRef.current.scale.z = t
    })
    return (
      <mesh ref={meshRef}>
        {/* Sphere geometry with radius=1, widthSegments=32, heightSegments=32 */}
        <sphereGeometry args={[3, 32, 32]} />
        {/* Standard material with color */}
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  }

export default function HeadFunction() {
    return (<Canvas>
        {/* Adding some lighting to see the sphere */}
        <ambientLight intensity={5} />

        {/* Rendering the sphere */}
        <Sphere />
        </Canvas>)
}