import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Object3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountElement = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountElement.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 4); // Increased intensity
    const pointLight = new THREE.PointLight(0xffffff, 2); // Increased intensity
    pointLight.position.set(50, 50, 50);
    scene.add(ambientLight, pointLight);

    // Add a Directional Light to simulate strong light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
    directionalLight.position.set(0, 0, 1).normalize();
    scene.add(directionalLight);

    // Orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    // Load 3D Logo
    const loader = new GLTFLoader();
    loader.load(
      '/ImageToStl.com_tinker.glb', // Your 3D model path
      (gltf) => {
        const logo = gltf.scene;
        scene.add(logo);

        // Change the color of the logo to white and make it bright
        logo.traverse((child) => {
          if (child.isMesh) {
            child.material.color.set(0x999999); // Set logo color to white
            child.material.emissive.set(0x999999); // Make the logo appear as if it's emitting light
            child.material.emissiveIntensity = 0.9; // Increase emissive intensity to make it brighter
          }
        });

        // Initial scale of the logo
        logo.scale.set(10, 10, 10);

        // Create a particle system
        const particleCount = 900; // Number of particles
        const radius = 650; // Orbit radius
        const positions = [];
        const particleSpeeds = [];

        // Generate particles in circular positions
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = (Math.random() - 0.5) * radius; // Randomize z-axis for depth
          positions.push(x, y, z);
          particleSpeeds.push((Math.random() * 0.09) + 0.00); // Different speeds for each particle
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
          color: 0xffffff,
          size: 6,
        });

        const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
        scene.add(particleSystem);

        // Particle rotation animation
        const animateParticles = () => {
          const positionsArray = particlesGeometry.attributes.position.array;
          const time = performance.now() * 0.01; // Animation time
          for (let i = 0; i < particleCount; i++) {
            const angle = time * particleSpeeds[i] + i;
            positionsArray[i * 3] = Math.cos(angle) * radius; // X
            positionsArray[i * 3 + 1] = Math.sin(angle) * radius; // Y
            positionsArray[i * 3 + 2] = Math.sin(angle + i) * radius * 0.1; // Z (depth oscillation)
          }
          particlesGeometry.attributes.position.needsUpdate = true;
        };

        // Logo scaling animation
        let logoScale = 0;
        const targetScale = 1;
        const scaleSpeed = 0.02;

        const scaleLogo = () => {
          if (logoScale < targetScale) {
            logoScale += scaleSpeed;
            logo.scale.set(logoScale, logoScale, logoScale);
          }
        };

        // Rotation logic for both logo and particles
        let rotationSpeed = 0.6; // Initial high rotation speed
        let rotationDecreaseRate = 0.0198; // Rate at which speed decreases
        let isRotating = false;

        // Start rotating both logo and particles
        const startRotatingLogoAndParticles = () => {
          isRotating = true;
          const rotateLogoAndParticles = () => {
            if (rotationSpeed > 0) {
              // Rotate the logo in all directions
              logo.rotation.x += rotationSpeed; // Rotate around X-axis
              logo.rotation.y += rotationSpeed; // Rotate around Y-axis
              logo.rotation.z += rotationSpeed; // Rotate around Z-axis

              // Rotate the particle system (same speed)
              particleSystem.rotation.x += rotationSpeed;
              particleSystem.rotation.y += rotationSpeed;
              particleSystem.rotation.z += rotationSpeed;

              // Gradually decrease the rotation speed
              rotationSpeed -= rotationDecreaseRate;

              requestAnimationFrame(rotateLogoAndParticles); // Continue the animation
            } else {
              // Stop rotation after the speed drops to zero
              isRotating = false;
            }
          };

          rotateLogoAndParticles();
        };

        // Render loop
        const animate = () => {
          requestAnimationFrame(animate);
          animateParticles();
          scaleLogo();
          if (logoScale >= targetScale && !isRotating) {
            startRotatingLogoAndParticles();
          }
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error('Error loading GLTF:', error)
    );

    // Cleanup
    return () => {
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Object3D;
