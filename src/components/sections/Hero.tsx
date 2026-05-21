import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { usePortfolioStore } from '../../store/usePortfolioStore';

function BackgroundEffects() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[1, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial color="#FFD34D" wireframe opacity={0.05} transparent />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}

export default function Hero() {
  const { mode, data } = usePortfolioStore();
  const isDark = mode === 'dark';

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <BackgroundEffects />
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-28 pb-10 lg:pt-0 lg:pb-0 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-3 md:mb-4 block">
              {data.hero.subtitle}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-space font-bold leading-[1.1] sm:leading-none mb-4 md:mb-6">
              {data.hero.name.split(' ')[0]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-soft">
                {data.hero.name.split(' ')[1]}
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-[#D6D6D6]/80 font-space font-light max-w-xl">
              {data.hero.tagline}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#D6D6D6]/60 max-w-md leading-relaxed"
          >
            {data.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {data.hero.buttons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.link}
                className={`px-8 py-4 rounded-full font-space font-medium tracking-wide transition-all duration-300 ${
                  idx === 0
                    ? "bg-primary text-bg-dark hover:shadow-[0_0_20px_rgba(255,211,77,0.4)]"
                    : "border border-white/10 text-white hover:bg-white/5"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="relative block mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[500px] lg:h-[500px] mx-auto"
          >
            {/* Glow Ring (Desktop Only) */}
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite] hidden lg:block" />
            <div className="absolute inset-4 rounded-full border border-primary/10 animate-[spin_15s_linear_infinite_reverse] hidden lg:block" />
            
            {/* Profile Image Container */}
            <div className="absolute inset-0 lg:inset-10 rounded-3xl lg:rounded-full overflow-hidden border-4 border-surface-deep shadow-[0_15px_35px_rgba(0,0,0,0.3)] lg:shadow-[0_0_50px_rgba(255,211,77,0.15)] bg-surface-deep">
              <img 
                src={data.profile.profileImage} 
                alt={data.profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Interactive Spotlight (Desktop Only) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[80px] rounded-full animate-pulse hidden lg:block" />
          </motion.div>
        </div>
      </div>

      {/* Floating HUD elements */}
      <div className="absolute bottom-10 left-10 hidden xl:block font-mono text-[9px] text-[#D6D6D6]/20 space-y-2 uppercase tracking-widest">
        <div>System_Status: Stable</div>
        <div>Uptime: 24:00:00:00</div>
        <div>Coordinates: {data.profile.location.split(',')[1]}</div>
      </div>
    </section>
  );
}
