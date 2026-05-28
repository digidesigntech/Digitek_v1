"use client";

import React, {
  Suspense,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Plane,
  Sphere,
  Stars,
} from "@react-three/drei";
import { X } from "lucide-react";

const ACCENT = "#a855f7";

type Card = {
  id: string;
  cat: string;
  imageUrl: string;
  alt: string;
  title: string;
};

type CardPosition = {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
};

const ALL_CARDS: Card[] = [
  // Logos
  { id: "logo-1", cat: "Logos", imageUrl: "/digi-design-portfolio/images/Logos/1.jpg", alt: "Logo Design 1", title: "Logo Design" },
  { id: "logo-2", cat: "Logos", imageUrl: "/digi-design-portfolio/images/Logos/2.jpg", alt: "Brand Identity", title: "Brand Identity" },
  { id: "logo-3", cat: "Logos", imageUrl: "/digi-design-portfolio/images/Logos/3.jpg", alt: "Modern Logo", title: "Modern Logo" },
  { id: "logo-4", cat: "Logos", imageUrl: "/digi-design-portfolio/images/Logos/4.jpg", alt: "Logo Mark", title: "Logo Mark" },
  { id: "logo-10", cat: "Logos", imageUrl: "/digi-design-portfolio/images/Logos/10.png", alt: "Wordmark", title: "Wordmark" },

  // Posters
  { id: "poster-1", cat: "Posters", imageUrl: "/digi-design-portfolio/images/Posters/1.jpg", alt: "Premium Poster", title: "Premium Poster" },
  { id: "poster-2", cat: "Posters", imageUrl: "/digi-design-portfolio/images/Posters/2.jpg", alt: "Marketing Kit", title: "Marketing Kit" },
  { id: "poster-3", cat: "Posters", imageUrl: "/digi-design-portfolio/images/Posters/3.jpeg", alt: "Clinic Poster", title: "Clinic Poster" },
  { id: "poster-4", cat: "Posters", imageUrl: "/digi-design-portfolio/images/Posters/4.jpg", alt: "Awareness Poster", title: "Awareness Poster" },

  // Brochures
  { id: "br-1", cat: "Brouchures", imageUrl: "/digi-design-portfolio/images/Brouchures/1.jpg", alt: "Brochure Cover", title: "Brochure Cover" },
  { id: "br-2", cat: "Brouchures", imageUrl: "/digi-design-portfolio/images/Brouchures/2.jpg", alt: "Tri-Fold", title: "Tri-Fold" },
  { id: "br-3", cat: "Brouchures", imageUrl: "/digi-design-portfolio/images/Brouchures/3.jpg", alt: "Treatment Menu", title: "Treatment Menu" },

  // Social
  { id: "soc-1", cat: "SOCIAL", imageUrl: "/digi-design-portfolio/images/SOCIAL/1.jpg", alt: "Social Post", title: "Social Post" },
  { id: "soc-2", cat: "SOCIAL", imageUrl: "/digi-design-portfolio/images/SOCIAL/2.jpg", alt: "Digital Ad", title: "Digital Ad" },
  { id: "soc-3", cat: "SOCIAL", imageUrl: "/digi-design-portfolio/images/SOCIAL/3.jpg", alt: "Reel Cover", title: "Reel Cover" },

  // Menu Cards
  { id: "mc-1", cat: "MENUCARD", imageUrl: "/digi-design-portfolio/images/MENUCARD/1.jpeg", alt: "Menu Card", title: "Menu Card" },
  { id: "mc-2", cat: "MENUCARD", imageUrl: "/digi-design-portfolio/images/MENUCARD/2.jpeg", alt: "Cafe Menu", title: "Cafe Menu" },
  { id: "mc-5", cat: "MENUCARD", imageUrl: "/digi-design-portfolio/images/MENUCARD/5.jpg", alt: "Treatment Menu", title: "Treatment Menu" },

  // Packaging
  { id: "pk-1", cat: "PACKAGING", imageUrl: "/digi-design-portfolio/images/PACKAGING/1.jpeg", alt: "Product Pack", title: "Product Pack" },
  { id: "pk-2", cat: "PACKAGING", imageUrl: "/digi-design-portfolio/images/PACKAGING/2.jpeg", alt: "Package Design", title: "Package Design" },
  { id: "pk-4", cat: "PACKAGING", imageUrl: "/digi-design-portfolio/images/PACKAGING/4.jpeg", alt: "Skincare Box", title: "Skincare Box" },

  // Visiting Cards
  { id: "v-1", cat: "Visiting", imageUrl: "/digi-design-portfolio/images/Visiting/1.png", alt: "Business Card", title: "Business Card" },
  { id: "v-2", cat: "Visiting", imageUrl: "/digi-design-portfolio/images/Visiting/2.jpg", alt: "Doctor Card", title: "Doctor Card" },
  { id: "v-10", cat: "Visiting", imageUrl: "/digi-design-portfolio/images/Visiting/10.jpg", alt: "Clinic Card", title: "Clinic Card" },

  // Ads
  { id: "ad-1", cat: "ADS", imageUrl: "/digi-design-portfolio/images/ADS/1.jpg", alt: "Creative Ad", title: "Creative Ad" },
  { id: "ad-2", cat: "ADS", imageUrl: "/digi-design-portfolio/images/ADS/2.jpg", alt: "Campaign Ad", title: "Campaign Ad" },
  { id: "ad-3", cat: "ADS", imageUrl: "/digi-design-portfolio/images/ADS/3.jpg", alt: "Launch Ad", title: "Launch Ad" },

  // Standees
  { id: "st-1", cat: "Standees", imageUrl: "/digi-design-portfolio/images/Standees/1.jpg", alt: "Event Standee", title: "Event Standee" },
  { id: "st-2", cat: "Standees", imageUrl: "/digi-design-portfolio/images/Standees/2.jpg", alt: "Clinic Standee", title: "Clinic Standee" },

  // Patient Files
  { id: "pf-1", cat: "PatientFiles", imageUrl: "/digi-design-portfolio/images/PatientFiles/1.png", alt: "Patient File", title: "Patient File" },
  { id: "pf-2", cat: "PatientFiles", imageUrl: "/digi-design-portfolio/images/PatientFiles/2.jpg", alt: "Consultation File", title: "Consultation File" },

  // Brandings — product mockups / brand collateral
  { id: "br-mock-1", cat: "Brandings", imageUrl: "/images/brandings/Serum%20Bottle%20Mockup%2001.png", alt: "Serum bottle product branding", title: "Serum Bottle" },
  { id: "br-mock-2", cat: "Brandings", imageUrl: "/images/brandings/body%20moisturize.png", alt: "Body moisturiser product branding", title: "Body Moisturiser" },
  { id: "br-mock-3", cat: "Brandings", imageUrl: "/images/brandings/lightening%20face%20wash.png", alt: "Lightening face wash branding", title: "Lightening Face Wash" },
  { id: "br-mock-4", cat: "Brandings", imageUrl: "/images/brandings/lip%20lightening%20cream.png", alt: "Lip lightening cream branding", title: "Lip Lightening Cream" },
  { id: "br-mock-5", cat: "Brandings", imageUrl: "/images/brandings/lip%20balm.png", alt: "Lip balm branding", title: "Lip Balm" },
  { id: "br-mock-6", cat: "Brandings", imageUrl: "/images/brandings/physical%20sunscreen.png", alt: "Physical sunscreen branding", title: "Physical Sunscreen" },
  { id: "br-mock-7", cat: "Brandings", imageUrl: "/images/brandings/all%20in%20one%20shampoo.png", alt: "All-in-one shampoo branding", title: "All-in-One Shampoo" },
  { id: "br-mock-8", cat: "Brandings", imageUrl: "/images/brandings/conditioner.png", alt: "Conditioner branding", title: "Conditioner" },
];

const FILTERS: { id: string; label: string }[] = [
  { id: "ALL", label: "All Work" },
  { id: "Brandings", label: "Brandings" },
  { id: "Logos", label: "Logos" },
  { id: "Posters", label: "Posters" },
  { id: "Brouchures", label: "Brochures" },
  { id: "SOCIAL", label: "Social" },
  { id: "MENUCARD", label: "Menu Cards" },
  { id: "PACKAGING", label: "Packaging" },
  { id: "Visiting", label: "Visiting" },
  { id: "ADS", label: "Ads" },
  { id: "Standees", label: "Standees" },
  { id: "PatientFiles", label: "Patient Files" },
];

type CardContextType = {
  selectedCard: Card | null;
  setSelectedCard: (card: Card | null) => void;
  cards: Card[];
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}

function FloatingCard({
  card,
  position,
  isSelected,
}: {
  card: Card;
  position: CardPosition;
  isSelected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelectedCard(card);
  };
  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const highlighted = hovered || isSelected;

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[5.2, 6.8]}
        scale={highlighted ? 1.7 : 1}
        position-z={highlighted ? 0.2 : 0}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        zIndexRange={highlighted ? [100, 0] : [10, 0]}
        style={{
          transition: "transform 0.35s cubic-bezier(.16,1,.3,1)",
          transform: highlighted ? "scale(1.7)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-lg overflow-hidden shadow-2xl bg-[#120a28] p-3 select-none transition-all duration-300"
          style={{
            boxShadow: highlighted
              ? `0 30px 70px rgba(168, 85, 247, 0.65), 0 0 50px rgba(168, 85, 247, 0.45)`
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: highlighted
              ? `2px solid rgba(168, 85, 247, 0.85)`
              : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-md"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-1 text-center">
            <p className="text-white text-xs font-medium truncate">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  );
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard();

  if (!selectedCard) return null;

  const handleClose = () => setSelectedCard(null);
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-5xl w-full mx-4 flex flex-col items-center">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <img
          loading="lazy"
          className="max-h-[80vh] w-auto max-w-full rounded-2xl bg-black object-contain shadow-2xl"
          alt={selectedCard.alt}
          src={selectedCard.imageUrl}
        />

        <div className="text-center mt-4">
          <div className="text-xs uppercase tracking-[0.2em] text-purple-300 mb-1">
            {FILTERS.find((f) => f.id === selectedCard.cat)?.label ?? selectedCard.cat}
          </div>
          <h3 className="text-white text-lg font-semibold">{selectedCard.title}</h3>
        </div>
      </div>
    </div>
  );
}

function CardGalaxy() {
  const { cards, selectedCard } = useCard();

  const cardPositions = useMemo<CardPosition[]>(() => {
    const positions: CardPosition[] = [];
    const numCards = cards.length;
    if (numCards === 0) return positions;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = numCards === 1 ? 0 : 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(1 - y * y, 0));
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = numCards <= 6 ? 11 : 12 + (i % 3) * 4;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      });
    }
    return positions;
  }, [cards]);

  return (
    <>
      <Sphere args={[2, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color={ACCENT} transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[20, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color={ACCENT} transparent opacity={0.025} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard
          key={card.id}
          card={card}
          position={cardPositions[i]}
          isSelected={selectedCard?.id === card.id}
        />
      ))}
    </>
  );
}

export default function StellarCardGallery() {
  const [filter, setFilter] = useState("ALL");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const filteredCards = useMemo(
    () => (filter === "ALL" ? ALL_CARDS : ALL_CARDS.filter((c) => c.cat === filter)),
    [filter]
  );

  const contextValue = useMemo(
    () => ({ selectedCard, setSelectedCard, cards: filteredCards }),
    [selectedCard, filteredCards]
  );

  return (
    <CardContext.Provider value={contextValue}>
      {/* Filter chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
              filter === f.id
                ? "bg-purple-500 text-white"
                : "glass glass-hover text-gray-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[700px] md:h-[80vh] rounded-2xl overflow-hidden bg-black border border-white/10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          className="absolute inset-0 z-0"
        >
          <color attach="background" args={["#000000"]} />
          {/* Re-provide context inside the Canvas — R3F runs its own reconciler */}
          <CardContext.Provider value={contextValue}>
            <Suspense fallback={null}>
              <Stars
                radius={120}
                depth={60}
                count={2500}
                factor={3}
                saturation={0}
                fade
                speed={0.4}
              />
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.7} />
              <pointLight position={[-10, -10, -10]} intensity={0.35} />
              <CardGalaxy />
              <OrbitControls
                enablePan
                enableZoom
                enableRotate
                minDistance={5}
                maxDistance={40}
                autoRotate={false}
                rotateSpeed={0.5}
                zoomSpeed={1.2}
                panSpeed={0.8}
                target={[0, 0, 0]}
              />
            </Suspense>
          </CardContext.Provider>
        </Canvas>

        <CardModal />

        {/* Count badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-xs font-semibold uppercase tracking-wider">
            {filteredCards.length} item{filteredCards.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 z-20 text-white/70 pointer-events-none">
          <p className="text-xs uppercase tracking-[0.2em]">
            Drag to rotate · Scroll to zoom · Click a card to view
          </p>
        </div>

        {filteredCards.length === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center text-gray-400 text-sm">
            No items in this category.
          </div>
        )}
      </div>
    </CardContext.Provider>
  );
}
