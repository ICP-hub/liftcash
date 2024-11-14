import { useRef, useEffect } from "react";
import * as THREE from "three";

const FloatingDustWave = () => {
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

    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Settings for multiple waves
    const waveSettings = [
      { color: 0x00a2ed, offsetY: 0 },
      { color: 0x09a8e6, offsetY: 0.5 },
      { color: 0x08171a, offsetY: -0.5 },
      { color: 0x00a2ed, offsetY: 0 },
    ];

    const waves = [];

    waveSettings.forEach(({ color, offsetY }) => {
      const particles = 5000; // Number of particles
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particles * 3);

      // Initialize each particle's position
      for (let i = 0; i < particles; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 10; // X position
        positions[i * 3 + 1] = offsetY + (Math.random() - 0.5) * 5; // Y position with offset
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z position for slight depth
      }
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      // Create material for particles
      const material = new THREE.PointsMaterial({
        color,
        size: 0.04, // Smaller size for dust-like particles
        transparent: true,
        opacity: 0.6,
      });

      // Create particle system and add to the scene
      const particleSystem = new THREE.Points(geometry, material);
      scene.add(particleSystem);

      waves.push(particleSystem);
    });

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.0003;

      waves.forEach((particleSystem) => {
        const positionsArray =
          particleSystem.geometry.attributes.position.array;

        for (let i = 0; i < positionsArray.length / 3; i++) {
          const x = positionsArray[i * 3];
          const initialY = positionsArray[i * 3 + 1];

          // Apply gentle floating motion
          positionsArray[i * 3] += Math.sin(time + i) * 0.001; // Small drift in X direction
          positionsArray[i * 3 + 1] =
            initialY + Math.sin(x * 0.3 + time) * 0.03; // Wave-like motion in Y axis

          // Reset particles that move off the X boundaries to keep them within view
          if (positionsArray[i * 3] > 5) positionsArray[i * 3] = -5;
          if (positionsArray[i * 3] < -5) positionsArray[i * 3] = 5;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      });

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

export default FloatingDustWave;
