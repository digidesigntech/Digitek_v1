"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

type ThreeRefs = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
  locations?: number[];
  fadeAmount?: number;
};

const TITLES = ["DIGI DESIGN", "AESTHETIC", "PORTFOLIO"];
const SUBTITLES = [
  {
    line1: "A full-service design studio —",
    line2: "across social, print, web, brand & campaigns.",
  },
  {
    line1: "500+ aesthetic clinics across India",
    line2: "trust the visual language we already speak.",
  },
  {
    line1: "Step inside the work —",
    line2: "and see how design becomes a brand.",
  },
];

export const HorizonHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  });

  useEffect(() => {
    const refs = threeRefs.current;

    const createStarField = () => {
      const starCount = 5000;
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const color = new THREE.Color();
          const c = Math.random();
          if (c < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          else if (c < 0.9) color.setHSL(0.08, 0.5, 0.8);
          else color.setHSL(0.6, 0.5, 0.8);

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: { time: { value: 0 }, depth: { value: i } },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x7c3aed) },
          color2: { value: new THREE.Color(0xff7ad9) },
          opacity: { value: 0.35 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const layers = [
        { distance: -50, height: 60, color: 0x1a0b3d, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
      ];

      layers.forEach((layer, index) => {
        const points: THREE.Vector2[] = [];
        const segments = 50;
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y =
            Math.sin(i * 0.1) * layer.height +
            Math.sin(i * 0.05) * layer.height * 0.5 +
            Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = {
          baseZ: layer.distance,
          baseOpacity: layer.opacity,
          index,
        };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          uniform float time;
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.55, 0.4, 1.0) * intensity;
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });
      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene!.add(atmosphere);
    };

    const getLocations = () => {
      refs.locations = refs.mountains.map((m) => m.position.z);
    };

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((s) => {
        const mat = s.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      });

      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time * 0.5;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const k = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * k;
        smoothCameraPos.current.y += ((refs.targetCameraY ?? 0) - smoothCameraPos.current.y) * k;
        smoothCameraPos.current.z += ((refs.targetCameraZ ?? 0) - smoothCameraPos.current.z) * k;

        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      const fade = refs.fadeAmount ?? 0;
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;

        const mat = mountain.material as THREE.MeshBasicMaterial;
        const baseOp = (mountain.userData.baseOpacity as number) ?? mat.opacity;
        const targetOp = baseOp * (1 - fade);
        mat.opacity += (targetOp - mat.opacity) * 0.1;
      });

      if (refs.composer) refs.composer.render();
    };

    const initThree = () => {
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
      refs.composer.addPass(
        new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          0.8,
          0.4,
          0.85
        )
      );

      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocations();
      animate();
      setIsReady(true);
    };

    initThree();

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      if (refs.renderer) refs.renderer.dispose();
      refs.stars = [];
      refs.mountains = [];
      refs.nebula = null;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    gsap.set(
      [menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current],
      { visibility: "visible" }
    );

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: "power3.out" });
    }

    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".title-char");
      tl.from(
        chars,
        { y: 200, opacity: 0, duration: 1.4, stagger: 0.05, ease: "power4.out" },
        "-=0.5"
      );
    }

    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        lines,
        { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.8"
      );
    }

    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        { opacity: 0, y: 50, duration: 1, ease: "power2.out" },
        "-=0.5"
      );
    }

    // Drop-in animation for the downstream panels (HEALTHCARE + PORTFOLIO).
    // CSS holds the initial hidden / translated-up state for the title,
    // subtitle and CTA. An IntersectionObserver toggles `.is-visible` on
    // each panel when it crosses 35% of the viewport, which triggers the
    // staggered transition defined in the inlined CSS below.
    const panels = document.querySelectorAll(".content-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    panels.forEach((p) => observer.observe(p));

    return () => {
      tl.kill();
      observer.disconnect();
    };
  }, [isReady]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(documentHeight - windowHeight, 1);
      const progress = Math.min(scrollY / maxScroll, 1);

      setScrollProgress(progress);
      const newSection = Math.min(
        Math.floor(progress * (totalSections + 1)),
        totalSections
      );
      setCurrentSection(newSection);

      const refs = threeRefs.current;
      if (!refs.scene || !refs.nebula || !refs.locations) return;

      const totalProgress = progress * (totalSections + 1);
      const sectionProgress = totalProgress % 1;

      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 },
      ];

      const currentPos = cameraPositions[newSection] ?? cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] ?? currentPos;

      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      // Smooth fade-out of the mountains between progress 0.55 and 0.85
      // (replaces the previous binary teleport to z = 600000)
      const fadeStart = 0.55;
      const fadeEnd = 0.85;
      const t = Math.min(Math.max((progress - fadeStart) / (fadeEnd - fadeStart), 0), 1);
      refs.fadeAmount = t * t * (3 - 2 * t); // smoothstep
      // Keep mountain z stable at base — the animate loop handles parallax x/y
      refs.mountains.forEach((mountain, i) => {
        mountain.position.z = refs.locations![i];
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSections]);

  const splitTitle = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="title-char">
        {char === " " ? " " : char}
      </span>
    ));

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div
        ref={menuRef}
        className={`side-menu ${
          currentSection >= totalSections ? "side-menu-fade" : ""
        }`}
        style={{ visibility: "hidden" }}
      >
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">DIGI DESIGN</div>
      </div>

      <div className="hero-content cosmos-content">
        <h1 ref={titleRef} className="hero-title">
          {splitTitle(TITLES[0])}
        </h1>
        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
          <p className="subtitle-line">{SUBTITLES[0].line1}</p>
          <p className="subtitle-line">{SUBTITLES[0].line2}</p>
        </div>
      </div>

      <div
        ref={scrollProgressRef}
        className={`scroll-progress ${
          currentSection >= totalSections ? "scroll-progress-fade" : ""
        }`}
        style={{ visibility: "hidden" }}
      >
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection).padStart(2, "0")} /{" "}
          {String(totalSections).padStart(2, "0")}
        </div>
      </div>

      <div className="scroll-sections">
        {[1, 2].map((i) => (
          <section key={i} className="content-section">
            <h1 className="hero-title">{splitTitle(TITLES[i])}</h1>
            <div className="hero-subtitle cosmos-subtitle">
              <p className="subtitle-line">{SUBTITLES[i].line1}</p>
              <p className="subtitle-line">{SUBTITLES[i].line2}</p>
            </div>
            {i === 2 && (
              <Link href="/digi-design-portfolio" className="hero-cta">
                Enter Portfolio
                <span aria-hidden>→</span>
              </Link>
            )}
          </section>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: CSS }} />
    </div>
  );
};

const CSS = `
.hero-container.cosmos-style{position:relative;width:100%;background:#000;color:#fff;font-family:var(--font-inter,'Inter',system-ui,sans-serif);overflow-x:hidden}
.hero-canvas{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}

.side-menu{position:fixed;left:28px;top:50%;transform:translateY(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:24px;color:#fff;transition:opacity .5s ease}
.side-menu.side-menu-fade{opacity:0;pointer-events:none}
.menu-icon{display:flex;flex-direction:column;gap:5px;cursor:pointer}
.menu-icon span{width:22px;height:1px;background:#fff;display:block;opacity:.7}
.vertical-text{writing-mode:vertical-rl;transform:rotate(180deg);font-size:10px;letter-spacing:6px;color:rgba(255,255,255,.55);font-weight:700}

.hero-content.cosmos-content{position:relative;z-index:5;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 24px}

.hero-title{font-size:clamp(3.5rem,11vw,10rem);font-weight:900;letter-spacing:-.04em;margin:0;line-height:.95;display:flex;justify-content:center;flex-wrap:wrap;overflow:hidden;filter:drop-shadow(0 2px 18px rgba(0,0,0,.6)) drop-shadow(0 0 28px rgba(0,0,0,.4))}
.title-char{display:inline-block;will-change:transform,opacity;background:linear-gradient(180deg,#ffffff 0%,#e9e3ff 55%,#c9beff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}

.hero-subtitle.cosmos-subtitle{margin-top:36px;max-width:640px}
.hero-subtitle p{font-size:.85rem;letter-spacing:.32em;color:#ffffff;text-transform:uppercase;margin:6px 0;font-weight:600;text-shadow:0 1px 12px rgba(0,0,0,.75),0 0 24px rgba(0,0,0,.5)}

.scroll-progress{position:fixed;bottom:36px;left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:10px;transition:opacity .5s ease}
.scroll-progress.scroll-progress-fade{opacity:0;pointer-events:none}
.scroll-text{font-size:9px;letter-spacing:5px;color:rgba(255,255,255,.55);font-weight:700}
.progress-track{width:220px;height:1px;background:rgba(255,255,255,.12);position:relative;overflow:hidden}
.progress-fill{position:absolute;left:0;top:0;height:100%;background:linear-gradient(90deg,#c77dff,#4cc9f0);transition:width .12s linear;box-shadow:0 0 12px rgba(199,125,255,.6)}
.section-counter{font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.55);font-variant-numeric:tabular-nums}

.scroll-sections{position:relative;z-index:5}
.content-section{height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 24px;gap:36px}

/* Drop-in reveal for the downstream panels. Elements start lifted up and
   invisible; .is-visible is added by the IntersectionObserver on enter. */
.content-section .hero-title,
.content-section .hero-subtitle,
.content-section .hero-cta{
  opacity:0;
  transform:translateY(-120px);
  transition:opacity .9s ease-out, transform .9s cubic-bezier(.16,1,.3,1);
}
.content-section.is-visible .hero-title{opacity:1;transform:translateY(0);transition-delay:0s}
.content-section.is-visible .hero-subtitle{opacity:1;transform:translateY(0);transition-delay:.18s}
.content-section.is-visible .hero-cta{opacity:1;transform:translateY(0);transition-delay:.36s}

@media (prefers-reduced-motion: reduce){
  .content-section .hero-title,
  .content-section .hero-subtitle,
  .content-section .hero-cta{
    opacity:1;
    transform:none;
    transition:none;
  }
}

.hero-cta{display:inline-flex;align-items:center;gap:12px;padding:16px 32px;border-radius:14px;background:linear-gradient(120deg,#c77dff 0%,#ff7ad9 50%,#4cc9f0 100%);color:#0a0420;text-decoration:none;font-weight:800;letter-spacing:.06em;font-size:14px;text-transform:uppercase;box-shadow:0 14px 36px rgba(199,125,255,.4);transition:transform .35s ease,box-shadow .35s ease;margin-top:10px}
.hero-cta:hover{transform:translateY(-3px);box-shadow:0 22px 48px rgba(199,125,255,.55)}
.hero-cta span{transition:transform .35s ease}
.hero-cta:hover span{transform:translateX(6px)}

@media(max-width:640px){
  .side-menu{left:14px;gap:18px}
  .progress-track{width:160px}
  .hero-subtitle p{font-size:.75rem;letter-spacing:.25em}
}
`;
