import { useRef, useEffect } from "react";
import * as THREE from "three";

const Waveform = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create particles geometry
    const particles = 10000; // Number of particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3); // XYZ per particle

    // Initialize each particle's position
    for (let i = 0; i < particles; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create material for particles as dots
    const material = new THREE.PointsMaterial({
      color: 0x00a1ed,
      size: 0.05, // Size of each dot
    });

    // Create particle system using Points and add it to the scene
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);

      // Update each particle's position for the waveform effect
      const time = Date.now() * 0.001;
      const positionsArray = geometry.attributes.position.array;

      for (let i = 0; i < particles; i++) {
        const x = positionsArray[i * 3];
        positionsArray[i * 3 + 1] = Math.sin(x * 2 + time) * 0.4; // Update Y based on sine wave
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-screen h-screen overflow-hidden fixed top-0 left-0"
    />
  );
};

export default Waveform;
