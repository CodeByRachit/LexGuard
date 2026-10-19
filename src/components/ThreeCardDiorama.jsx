import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeCardDiorama
 * 100% Local Pure Three.js WebGL Diorama for Below-The-Fold 3D Cards
 * Features:
 * - Real-time mouse parallax & tilt following cursor with lerp interpolation
 * - Tactile soft ground contact shadow disc for visible 3D spatial height
 * - Orbiting floating data dust / energy particles in 3D
 * - Studio Physical Materials with ACESFilmic tone mapping
 *
 * Types:
 * - 'vault': Frosted Glass Vault Cube with glowing RAM Core, corner chrome brackets & deflector particles (Gate L2)
 * - 'clauses': 3 Stepped Porcelain Clause Slabs with sweeping emerald verification beam & check prisms (Criterion 2 & CUAD)
 * - 'statute': Dual Fluted Alabaster Columns with Translucent Amber Shield & Balance Beam (Criterion 3 & India Code)
 */
export default function ThreeCardDiorama({ type = 'vault', className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 220;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0, 0.35, 5.8);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer with graceful fallback
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL context creation failed for ThreeCardDiorama:', e);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    // 3. Studio Lighting (Warm Porcelain Daylight Aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(0xfffbeb, 2.7);
    warmLight.position.set(4, 5, 5);
    scene.add(warmLight);

    const coolRim = new THREE.DirectionalLight(0xe0f2fe, 1.9);
    coolRim.position.set(-4, -2, -3);
    scene.add(coolRim);

    // Central Group
    const group = new THREE.Group();
    scene.add(group);

    // Geometries & Materials tracking for leak-free disposal
    const geometries = [];
    const materials = [];
    const trackGeo = (g) => {
      geometries.push(g);
      return g;
    };
    const trackMat = (m) => {
      materials.push(m);
      return m;
    };

    // 4. Ground Contact Shadow Disc
    const shadowGeo = trackGeo(new THREE.PlaneGeometry(3.0, 1.8));
    shadowGeo.rotateX(-Math.PI / 2);

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(24, 24, 27, 0.32)');
    grad.addColorStop(0.5, 'rgba(24, 24, 27, 0.12)');
    grad.addColorStop(1, 'rgba(24, 24, 27, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = trackMat(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      })
    );
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.35, 0);
    scene.add(shadowMesh);

    // 5. Floating Ambient Sparkles / Data Particles
    const particleGroup = new THREE.Group();
    const pGeo = trackGeo(new THREE.SphereGeometry(0.028, 8, 8));
    const pColor = type === 'vault' ? 0x10b981 : type === 'clauses' ? 0x3b82f6 : 0xf59e0b;
    const pMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: pColor,
        transparent: true,
        opacity: 0.75,
      })
    );
    const particles = [];
    for (let i = 0; i < 18; i++) {
      const p = new THREE.Mesh(pGeo, pMat);
      p.userData = {
        baseX: (Math.random() - 0.5) * 3.2,
        baseY: (Math.random() - 0.5) * 2.2,
        baseZ: (Math.random() - 0.5) * 2.0,
        speed: 0.6 + Math.random() * 0.9,
        offset: Math.random() * Math.PI * 2,
      };
      p.position.set(p.userData.baseX, p.userData.baseY, p.userData.baseZ);
      particleGroup.add(p);
      particles.push(p);
    }
    group.add(particleGroup);

    // ─────────────────────────────────────────────────────────────
    // TYPE 1: VAULT (Gate L2 Offline Memory Core)
    // ─────────────────────────────────────────────────────────────
    if (type === 'vault') {
      // Inner glowing RAM core
      const coreGeo = trackGeo(new THREE.OctahedronGeometry(0.58, 0));
      const coreMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.9,
          roughness: 0.15,
          metalness: 0.85,
        })
      );
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Inner Point Light illuminating inside of glass cube
      const coreLight = new THREE.PointLight(0x10b981, 2.5, 4);
      group.add(coreLight);

      // Inner glowing rings
      const ring1Geo = trackGeo(new THREE.TorusGeometry(0.88, 0.038, 16, 64));
      const ring1Mat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x34d399,
          emissive: 0x10b981,
          emissiveIntensity: 0.95,
          roughness: 0.1,
        })
      );
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.x = Math.PI / 4;
      group.add(ring1);

      const ring2Geo = trackGeo(new THREE.TorusGeometry(1.05, 0.025, 16, 64));
      const ring2 = new THREE.Mesh(ring2Geo, ring1Mat);
      ring2.rotation.y = Math.PI / 3;
      group.add(ring2);

      // Outer Frosted Glass Vault Cube
      const cubeGeo = trackGeo(new THREE.BoxGeometry(1.9, 1.9, 1.9));
      const cubeMat = trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0xf0fdf4,
          transmission: 0.88,
          opacity: 0.92,
          transparent: true,
          roughness: 0.1,
          ior: 1.48,
          thickness: 0.9,
          specularIntensity: 1.0,
        })
      );
      const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
      group.add(cubeMesh);

      // Outer Chrome Wireframe Frame
      const wireGeo = trackGeo(new THREE.BoxGeometry(1.92, 1.92, 1.92));
      const wireMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xa7f3d0,
          roughness: 0.1,
          metalness: 0.9,
          wireframe: true,
        })
      );
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      group.add(wireMesh);

      // 4 Orbiting Satellite Data Nodes
      const satGroup = new THREE.Group();
      group.add(satGroup);
      const satGeo = trackGeo(new THREE.BoxGeometry(0.18, 0.18, 0.18));
      const satMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x059669,
          emissive: 0x10b981,
          emissiveIntensity: 0.7,
        })
      );
      const satellites = [];
      for (let i = 0; i < 4; i++) {
        const sat = new THREE.Mesh(satGeo, satMat);
        sat.userData = { angle: (i * Math.PI) / 2, dist: 1.6 };
        satGroup.add(sat);
        satellites.push(sat);
      }

      group.userData.tick = (time) => {
        coreMesh.rotation.y = time * 0.9;
        coreMesh.rotation.x = time * 0.5;
        ring1.rotation.z = time * 0.8;
        ring2.rotation.x = -time * 0.7;

        cubeMesh.rotation.y = Math.sin(time * 0.4) * 0.25;
        cubeMesh.rotation.x = Math.cos(time * 0.3) * 0.15;
        wireMesh.rotation.copy(cubeMesh.rotation);

        satellites.forEach((sat, i) => {
          const a = sat.userData.angle + time * 0.7;
          sat.position.set(Math.cos(a) * sat.userData.dist, Math.sin(time + i) * 0.3, Math.sin(a) * sat.userData.dist);
          sat.rotation.y = time * 2;
        });
      };
    }

    // ─────────────────────────────────────────────────────────────
    // TYPE 2: CLAUSES (Criterion 2 & CUAD Verbatim Grounding)
    // ─────────────────────────────────────────────────────────────
    if (type === 'clauses') {
      const slabMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xfcfbf9,
          roughness: 0.22,
          metalness: 0.08,
        })
      );
      const textLineMat = trackMat(
        new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.7 })
      );

      // 3 Stepped Porcelain Clause Slabs
      const slabs = [];
      const slabConfigs = [
        { y: 0.55, z: -0.2, w: 2.1, h: 0.38, title: 'CL-004: GOVERNING LAW' },
        { y: 0.05, z: 0.15, w: 2.3, h: 0.42, title: 'CL-005: 6-MO LOCK-IN PERIOD' },
        { y: -0.48, z: 0.45, w: 2.0, h: 0.38, title: 'CL-006: PENALTY CLAUSE' },
      ];

      slabConfigs.forEach((cfg, idx) => {
        const sGeo = trackGeo(new THREE.BoxGeometry(cfg.w, cfg.h, 0.08));
        const sMesh = new THREE.Mesh(sGeo, slabMat);
        sMesh.position.set(0, cfg.y, cfg.z);
        sMesh.rotation.x = -0.15;
        group.add(sMesh);
        slabs.push(sMesh);

        // Embossed Clause Lines on each slab
        for (let l = -1; l <= 1; l++) {
          const lGeo = trackGeo(new THREE.BoxGeometry(cfg.w * 0.75, 0.025, 0.085));
          const lMesh = new THREE.Mesh(lGeo, textLineMat);
          lMesh.position.set(0, l * 0.1, 0.005);
          sMesh.add(lMesh);
        }
      });

      // Highlighted Active Emerald Text Highlight on Center Slab
      const activeHighlightGeo = trackGeo(new THREE.BoxGeometry(1.6, 0.09, 0.095));
      const activeHighlightMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x10b981,
          emissive: 0x059669,
          emissiveIntensity: 0.75,
        })
      );
      const activeHighlight = new THREE.Mesh(activeHighlightGeo, activeHighlightMat);
      activeHighlight.position.set(0, 0, 0.01);
      slabs[1].add(activeHighlight);

      // Sweeping Emerald Laser Beam Ring
      const ringGeo = trackGeo(new THREE.TorusGeometry(0.72, 0.065, 16, 64));
      const ringMat = trackMat(
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
      const laserRing = new THREE.Mesh(ringGeo, ringMat);
      laserRing.position.set(0, 0.05, 0.65);
      group.add(laserRing);

      // Floating Holographic Check Prism
      const prismGeo = trackGeo(new THREE.OctahedronGeometry(0.26, 0));
      const prismMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0x34d399,
          emissive: 0x10b981,
          emissiveIntensity: 0.95,
          roughness: 0.1,
        })
      );
      const prism = new THREE.Mesh(prismGeo, prismMat);
      prism.position.set(0, 0.05, 0.65);
      group.add(prism);

      group.userData.tick = (time) => {
        laserRing.position.x = Math.sin(time * 1.4) * 0.55;
        laserRing.rotation.z = time * 0.5;
        prism.position.x = laserRing.position.x;
        prism.rotation.y = time * 1.6;
        prism.rotation.x = Math.sin(time) * 0.4;

        slabs[0].position.y = 0.55 + Math.sin(time * 1.2) * 0.03;
        slabs[1].position.y = 0.05 + Math.cos(time * 1.2) * 0.03;
        slabs[2].position.y = -0.48 + Math.sin(time * 1.2 + 1) * 0.03;

        group.rotation.y = Math.sin(time * 0.4) * 0.18;
      };
    }

    // ─────────────────────────────────────────────────────────────
    // TYPE 3: STATUTE (Criterion 3 & India Code Legal Context)
    // ─────────────────────────────────────────────────────────────
    if (type === 'statute') {
      const marbleMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xf8fafc,
          roughness: 0.2,
          metalness: 0.1,
        })
      );
      const goldMat = trackMat(
        new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          roughness: 0.16,
          metalness: 0.9,
        })
      );

      // Dual Fluted Alabaster Columns (Left and Right)
      [-1.0, 1.0].forEach((posX) => {
        // Base Plinth
        const baseGeo = trackGeo(new THREE.BoxGeometry(0.48, 0.12, 0.48));
        const base = new THREE.Mesh(baseGeo, marbleMat);
        base.position.set(posX, -0.9, 0);
        group.add(base);

        // Column Shaft
        const shaftGeo = trackGeo(new THREE.CylinderGeometry(0.16, 0.17, 1.4, 20));
        const shaft = new THREE.Mesh(shaftGeo, marbleMat);
        shaft.position.set(posX, -0.15, 0);
        group.add(shaft);

        // Capital Top
        const capGeo = trackGeo(new THREE.BoxGeometry(0.48, 0.12, 0.48));
        const cap = new THREE.Mesh(capGeo, marbleMat);
        cap.position.set(posX, 0.6, 0);
        group.add(cap);
      });

      // Architrave Header Beam spanning columns
      const archGeo = trackGeo(new THREE.BoxGeometry(2.5, 0.14, 0.44));
      const arch = new THREE.Mesh(archGeo, marbleMat);
      arch.position.set(0, 0.72, 0);
      group.add(arch);

      // Translucent Amber Glass Shield (Center)
      const shieldGeo = trackGeo(new THREE.OctahedronGeometry(0.9, 1));
      shieldGeo.scale(0.85, 1.2, 0.3);
      const shieldMat = trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0xf59e0b,
          transmission: 0.88,
          opacity: 0.95,
          transparent: true,
          roughness: 0.12,
          ior: 1.48,
          thickness: 0.85,
        })
      );
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.position.set(0, -0.05, 0.25);
      group.add(shield);

      // Golden Scales of Justice suspended in front of shield
      const scaleGroup = new THREE.Group();
      scaleGroup.position.set(0, 0.2, 0.45);
      group.add(scaleGroup);

      // Horizontal Beam
      const beamGeo = trackGeo(new THREE.CylinderGeometry(0.026, 0.026, 1.6, 16));
      beamGeo.rotateZ(Math.PI / 2);
      const beam = new THREE.Mesh(beamGeo, goldMat);
      scaleGroup.add(beam);

      // Left Scale Pan
      const panGeo = trackGeo(new THREE.CylinderGeometry(0.2, 0.07, 0.06, 16));
      const leftPan = new THREE.Mesh(panGeo, goldMat);
      leftPan.position.set(-0.7, -0.32, 0);
      scaleGroup.add(leftPan);

      // Right Scale Pan
      const rightPan = new THREE.Mesh(panGeo, goldMat);
      rightPan.position.set(0.7, -0.32, 0);
      scaleGroup.add(rightPan);

      group.userData.tick = (time) => {
        const sway = Math.sin(time * 1.5) * 0.11;
        beam.rotation.z = sway;
        leftPan.position.y = -0.32 - sway * 0.7;
        rightPan.position.y = -0.32 + sway * 0.7;

        shield.rotation.y = Math.sin(time * 0.4) * 0.15;
        group.rotation.y = Math.sin(time * 0.35) * 0.12;
      };
    }

    // 6. Interactive Mouse Parallax (Card Tilt Interaction)
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let isHovered = false;
    const parentCard = container.closest('.group') || container;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTargetX = x * 0.75;
      mouseTargetY = -y * 0.65;
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      mouseTargetX = 0;
      mouseTargetY = 0;
    };

    if (parentCard) {
      parentCard.addEventListener('mousemove', handleMouseMove);
      parentCard.addEventListener('mouseenter', handleMouseEnter);
      parentCard.addEventListener('mouseleave', handleMouseLeave);
    }

    // 7. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth interpolation to mouse cursor
      group.position.x += (mouseTargetX - group.position.x) * 0.08;
      group.position.y += (mouseTargetY - group.position.y) * 0.08;

      // Animate floating energy sparkles
      particles.forEach((p) => {
        p.position.y = p.userData.baseY + Math.sin(time * p.userData.speed + p.userData.offset) * 0.18;
        p.position.x = p.userData.baseX + Math.cos(time * p.userData.speed + p.userData.offset) * 0.1;
      });

      if (group.userData.tick) {
        group.userData.tick(time * (isHovered ? 1.35 : 1.0));
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (parentCard) {
        parentCard.removeEventListener('mousemove', handleMouseMove);
        parentCard.removeEventListener('mouseenter', handleMouseEnter);
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
  }, [type]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
    />
  );
}
