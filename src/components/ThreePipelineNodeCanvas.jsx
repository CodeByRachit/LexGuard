import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreePipelineNodeCanvas
 * Pure Three.js 3D mini-viewport for each node in the 4-stage pipeline.
 * Features:
 * - Interactive mouse parallax: smoothly turns and tilts towards cursor
 * - 3D soft contact floor shadows giving tactile height above pedestal
 * - Orbiting floating energy sparkles / data dust in 3D
 * - High-precision studio materials (frosted glass, brushed gold, silicon die)
 *
 * Node 1: Tilted porcelain sheet sliced by laser plane into CL-001/002 blocks
 * Node 2: Silicon processor chip in a refractive glass containment dome with neural rings
 * Node 3: Refractive emerald magnifying ring hovering over text plate with check prism
 * Node 4: Warm amber shield with sculpted legal balance scale and fluted pillar
 */
export default function ThreePipelineNodeCanvas({ nodeId = 1, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 160;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    camera.position.set(0, 0.25, 4.8);
    camera.lookAt(0, 0, 0);

    // 2. Pure WebGL Renderer with graceful fallback
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL context creation failed for ThreePipelineNodeCanvas:', e);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (Warm Porcelain Daylight Aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xfffbeb, 2.6);
    warmLight.position.set(3, 4, 4);
    scene.add(warmLight);

    const coolLight = new THREE.DirectionalLight(0xe0f2fe, 1.8);
    coolLight.position.set(-3, -2, -3);
    scene.add(coolLight);

    // Subtle colored point light matching node theme
    const nodeColors = {
      1: 0x10b981,
      2: 0x14b8a6,
      3: 0x3b82f6,
      4: 0xf59e0b,
    };
    const accentColor = nodeColors[nodeId] || 0x10b981;
    const accentLight = new THREE.PointLight(accentColor, 1.2, 5);
    accentLight.position.set(0, 0.5, 1.5);
    scene.add(accentLight);

    // 4. Central Group
    const group = new THREE.Group();
    scene.add(group);

    // Geometries & Materials tracking for leak-free disposal
    const geometries = [];
    const materials = [];
    const trackG = (g) => {
      geometries.push(g);
      return g;
    };
    const trackM = (m) => {
      materials.push(m);
      return m;
    };

    // 5. Tactile Ground Contact Shadow Disc (grounds object in 3D space)
    const shadowGeo = trackG(new THREE.PlaneGeometry(2.2, 1.4));
    shadowGeo.rotateX(-Math.PI / 2);
    // Create radial gradient canvas for soft shadow
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(24, 24, 27, 0.28)');
    grad.addColorStop(0.5, 'rgba(24, 24, 27, 0.10)');
    grad.addColorStop(1, 'rgba(24, 24, 27, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = trackM(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.05, 0);
    scene.add(shadowMesh);

    // 6. Floating Ambient Sparkles / Data Dust (14 particles)
    const particleGroup = new THREE.Group();
    const pGeo = trackG(new THREE.SphereGeometry(0.025, 8, 8));
    const pMat = trackM(
      new THREE.MeshBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: 0.7,
      })
    );
    const particles = [];
    for (let i = 0; i < 14; i++) {
      const p = new THREE.Mesh(pGeo, pMat);
      p.userData = {
        baseX: (Math.random() - 0.5) * 2.4,
        baseY: (Math.random() - 0.5) * 1.8,
        baseZ: (Math.random() - 0.5) * 1.5,
        speed: 0.6 + Math.random() * 0.8,
        offset: Math.random() * Math.PI * 2,
      };
      p.position.set(p.userData.baseX, p.userData.baseY, p.userData.baseZ);
      particleGroup.add(p);
      particles.push(p);
    }
    group.add(particleGroup);

    // ─────────────────────────────────────────────────────────────
    // NODE 1: CLAUSE DNA SPLIT (PyMuPDF)
    // ─────────────────────────────────────────────────────────────
    if (nodeId === 1) {
      const sheetMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0xfbfaf8,
          roughness: 0.2,
          metalness: 0.08,
        })
      );
      const textLineMat = trackM(
        new THREE.MeshBasicMaterial({
          color: 0x94a3b8,
          transparent: true,
          opacity: 0.6,
        })
      );

      // Top severed half
      const topHalfGeo = trackG(new THREE.BoxGeometry(1.4, 0.75, 0.06));
      const topHalf = new THREE.Mesh(topHalfGeo, sheetMat);
      topHalf.position.set(0, 0.44, 0);
      group.add(topHalf);

      // Embossed lines on top half
      for (let i = -1; i <= 1; i++) {
        const lineGeo = trackG(new THREE.BoxGeometry(0.9, 0.03, 0.065));
        const line = new THREE.Mesh(lineGeo, textLineMat);
        line.position.set(0, i * 0.18, 0.005);
        topHalf.add(line);
      }

      // Bottom severed half
      const bottomHalfGeo = trackG(new THREE.BoxGeometry(1.4, 0.75, 0.06));
      const bottomHalf = new THREE.Mesh(bottomHalfGeo, sheetMat);
      bottomHalf.position.set(0, -0.44, 0);
      group.add(bottomHalf);

      // Embossed lines on bottom half
      for (let i = -1; i <= 1; i++) {
        const lineGeo = trackG(new THREE.BoxGeometry(0.9, 0.03, 0.065));
        const line = new THREE.Mesh(lineGeo, textLineMat);
        line.position.set(0, i * 0.18, 0.005);
        bottomHalf.add(line);
      }

      // Slicing Laser Plane
      const laserGeo = trackG(new THREE.CylinderGeometry(0.02, 0.02, 1.9, 16));
      laserGeo.rotateZ(Math.PI / 2);
      const laserMat = trackM(
        new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.95,
        })
      );
      const laserMesh = new THREE.Mesh(laserGeo, laserMat);
      group.add(laserMesh);

      // Glowing cutting glow sheet
      const glowPlaneGeo = trackG(new THREE.PlaneGeometry(1.8, 0.18));
      const glowPlaneMat = trackM(
        new THREE.MeshBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.45,
          side: THREE.DoubleSide,
        })
      );
      const glowPlane = new THREE.Mesh(glowPlaneGeo, glowPlaneMat);
      group.add(glowPlane);

      // Floating Split Clause Cubes (CL-001 / CL-002)
      const cube1Geo = trackG(new THREE.BoxGeometry(0.26, 0.26, 0.26));
      const cube1Mat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.85,
          roughness: 0.1,
          metalness: 0.5,
        })
      );
      const cube1 = new THREE.Mesh(cube1Geo, cube1Mat);
      cube1.position.set(0.75, 0.22, 0.35);
      group.add(cube1);

      const cube2 = cube1.clone();
      cube2.position.set(-0.75, -0.22, 0.35);
      group.add(cube2);

      group.userData.tick = (time) => {
        group.rotation.y = -0.25 + Math.sin(time * 0.5) * 0.18;
        group.rotation.z = -0.12 + Math.cos(time * 0.4) * 0.06;

        const pulse = Math.sin(time * 2.2);
        laserMesh.scale.x = 1.0 + pulse * 0.08;
        glowPlane.scale.y = 1.0 + pulse * 0.2;
        topHalf.position.y = 0.44 + Math.abs(pulse) * 0.07;
        bottomHalf.position.y = -0.44 - Math.abs(pulse) * 0.07;

        cube1.rotation.y = time * 1.6;
        cube1.rotation.x = time * 0.8;
        cube2.rotation.y = -time * 1.6;
        cube2.rotation.x = -time * 0.8;
      };
    }

    // ─────────────────────────────────────────────────────────────
    // NODE 2: AIR-GAPPED GEMMA 3N SILICON CORE
    // ─────────────────────────────────────────────────────────────
    if (nodeId === 2) {
      // Silicon Chip Substrate
      const chipGeo = trackG(new THREE.BoxGeometry(1.15, 0.12, 1.15));
      const chipMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          roughness: 0.2,
          metalness: 0.9,
        })
      );
      const chipMesh = new THREE.Mesh(chipGeo, chipMat);
      group.add(chipMesh);

      // Gold Perimeter Contact Pins
      const pinMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          metalness: 0.95,
          roughness: 0.1,
        })
      );
      for (let i = -4; i <= 4; i++) {
        const pinGeo = trackG(new THREE.BoxGeometry(0.04, 0.06, 0.12));
        const pinNorth = new THREE.Mesh(pinGeo, pinMat);
        pinNorth.position.set(i * 0.12, 0, 0.6);
        chipMesh.add(pinNorth);

        const pinSouth = pinNorth.clone();
        pinSouth.position.set(i * 0.12, 0, -0.6);
        chipMesh.add(pinSouth);
      }

      // Emerald Core Die
      const dieGeo = trackG(new THREE.BoxGeometry(0.68, 0.09, 0.68));
      const dieMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.9,
          roughness: 0.1,
          metalness: 0.6,
        })
      );
      const dieMesh = new THREE.Mesh(dieGeo, dieMat);
      dieMesh.position.y = 0.09;
      chipMesh.add(dieMesh);

      // Translucent Glass Containment Dome
      const domeGeo = trackG(new THREE.SphereGeometry(1.22, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.5));
      const domeMat = trackM(
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.92,
          opacity: 0.95,
          transparent: true,
          roughness: 0.06,
          ior: 1.5,
          thickness: 0.7,
        })
      );
      const domeMesh = new THREE.Mesh(domeGeo, domeMat);
      domeMesh.position.y = -0.1;
      group.add(domeMesh);

      // Orbiting Neural Rings
      const ring1Geo = trackG(new THREE.TorusGeometry(1.38, 0.022, 16, 64));
      const ring1Mat = trackM(
        new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.85 })
      );
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 4;
      group.add(ring1);

      const ring2Geo = trackG(new THREE.TorusGeometry(1.25, 0.018, 16, 64));
      const ring2Mat = trackM(
        new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.7 })
      );
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.y = Math.PI / 3;
      group.add(ring2);

      group.userData.tick = (time) => {
        chipMesh.rotation.y = time * 0.65;
        ring1.rotation.z = time * 0.9;
        ring1.rotation.y = Math.sin(time * 0.5) * 0.4;
        ring2.rotation.x = -time * 0.8;
        group.rotation.x = 0.38 + Math.sin(time * 0.4) * 0.08;
      };
    }

    // ─────────────────────────────────────────────────────────────
    // NODE 3: VERBATIM SUBSTRING TRUTH LENS
    // ─────────────────────────────────────────────────────────────
    if (nodeId === 3) {
      // Contract Plate
      const plateGeo = trackG(new THREE.BoxGeometry(1.65, 0.09, 1.15));
      const plateMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0xfcfbf9,
          roughness: 0.25,
          metalness: 0.05,
        })
      );
      const plateMesh = new THREE.Mesh(plateGeo, plateMat);
      plateMesh.rotation.x = 0.42;
      group.add(plateMesh);

      // Regular text lines on plate
      const textMat = trackM(
        new THREE.MeshBasicMaterial({ color: 0xc8c3b9, transparent: true, opacity: 0.8 })
      );
      for (let i = -2; i <= 2; i++) {
        if (i === 0) continue; // Leave center for highlight
        const lineGeo = trackG(new THREE.BoxGeometry(1.2, 0.02, 0.08));
        const line = new THREE.Mesh(lineGeo, textMat);
        line.position.set(0, 0.05, i * 0.18);
        plateMesh.add(line);
      }

      // Highlighted Green Clause Bar on Plate
      const barGeo = trackG(new THREE.BoxGeometry(1.25, 0.025, 0.22));
      const barMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.6,
        })
      );
      const barMesh = new THREE.Mesh(barGeo, barMat);
      barMesh.position.set(0, 0.055, 0);
      plateMesh.add(barMesh);

      // Emerald Magnifying Torus
      const lensGeo = trackG(new THREE.TorusGeometry(0.58, 0.06, 16, 64));
      const lensMat = trackM(
        new THREE.MeshPhysicalMaterial({
          color: 0x10b981,
          transmission: 0.9,
          opacity: 0.95,
          transparent: true,
          roughness: 0.05,
          ior: 1.5,
          thickness: 0.6,
        })
      );
      const lensMesh = new THREE.Mesh(lensGeo, lensMat);
      lensMesh.position.set(0, 0.48, 0.42);
      group.add(lensMesh);

      // Floating Checkmark Prism
      const checkGeo = trackG(new THREE.OctahedronGeometry(0.22, 0));
      const checkMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0x34d399,
          emissive: 0x10b981,
          emissiveIntensity: 0.95,
          roughness: 0.1,
        })
      );
      const checkMesh = new THREE.Mesh(checkGeo, checkMat);
      checkMesh.position.set(0, 0.48, 0.42);
      group.add(checkMesh);

      group.userData.tick = (time) => {
        lensMesh.position.x = Math.sin(time * 1.3) * 0.38;
        lensMesh.rotation.z = time * 0.45;
        checkMesh.position.x = lensMesh.position.x;
        checkMesh.rotation.y = time * 1.5;
        checkMesh.rotation.z = Math.sin(time) * 0.3;
        group.rotation.y = Math.sin(time * 0.5) * 0.16;
      };
    }

    // ─────────────────────────────────────────────────────────────
    // NODE 4: LAWYER ESCALATION & STATUTORY SHIELD
    // ─────────────────────────────────────────────────────────────
    if (nodeId === 4) {
      const goldMat = trackM(
        new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.18,
          metalness: 0.9,
        })
      );

      // Amber Glass Shield
      const shieldGeo = trackG(new THREE.OctahedronGeometry(0.78, 1));
      shieldGeo.scale(0.85, 1.15, 0.28);
      const shieldMat = trackM(
        new THREE.MeshPhysicalMaterial({
          color: 0xf59e0b,
          transmission: 0.88,
          opacity: 0.95,
          transparent: true,
          roughness: 0.12,
          ior: 1.45,
          thickness: 0.75,
        })
      );
      const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
      shieldMesh.position.set(0, 0.05, 0);
      group.add(shieldMesh);

      // Central Support Pillar
      const postGeo = trackG(new THREE.CylinderGeometry(0.04, 0.05, 1.2, 16));
      const postMesh = new THREE.Mesh(postGeo, goldMat);
      postMesh.position.set(0, 0.2, 0.1);
      group.add(postMesh);

      // Balance scale beam
      const beamGeo = trackG(new THREE.CylinderGeometry(0.028, 0.028, 1.55, 16));
      beamGeo.rotateZ(Math.PI / 2);
      const beamMesh = new THREE.Mesh(beamGeo, goldMat);
      beamMesh.position.set(0, 0.7, 0.18);
      group.add(beamMesh);

      // Scale pans
      const panGeo = trackG(new THREE.CylinderGeometry(0.18, 0.06, 0.06, 16));
      const leftPan = new THREE.Mesh(panGeo, goldMat);
      leftPan.position.set(-0.68, 0.42, 0.18);
      group.add(leftPan);

      const rightPan = new THREE.Mesh(panGeo, goldMat);
      rightPan.position.set(0.68, 0.42, 0.18);
      group.add(rightPan);

      group.userData.tick = (time) => {
        const tilt = Math.sin(time * 1.5) * 0.1;
        beamMesh.rotation.z = tilt;
        leftPan.position.y = 0.42 - tilt * 0.68;
        rightPan.position.y = 0.42 + tilt * 0.68;
        group.rotation.y = Math.sin(time * 0.4) * 0.22;
      };
    }

    // 7. Interactive Mouse Parallax (Card Tilt Interaction)
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    const parentCard = container.closest('.group') || container;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTargetX = x * 0.6;
      mouseTargetY = -y * 0.5;
    };

    const handleMouseLeave = () => {
      mouseTargetX = 0;
      mouseTargetY = 0;
    };

    if (parentCard) {
      parentCard.addEventListener('mousemove', handleMouseMove);
      parentCard.addEventListener('mouseleave', handleMouseLeave);
    }

    // 8. Animation Loop
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth lerp to mouse tilt
      group.position.x += (mouseTargetX - group.position.x) * 0.08;
      group.position.y += (mouseTargetY - group.position.y) * 0.08;

      // Animate floating energy sparkles
      particles.forEach((p) => {
        p.position.y = p.userData.baseY + Math.sin(time * p.userData.speed + p.userData.offset) * 0.15;
        p.position.x = p.userData.baseX + Math.cos(time * p.userData.speed + p.userData.offset) * 0.08;
      });

      if (group.userData.tick) {
        group.userData.tick(time);
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (parentCard) {
        parentCard.removeEventListener('mousemove', handleMouseMove);
        parentCard.removeEventListener('mouseleave', handleMouseLeave);
      }
      shadowTex.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [nodeId]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    />
  );
}
