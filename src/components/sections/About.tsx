import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function About() {
  const { data } = usePortfolioStore();
  
  return (
    <section id="about" className="py-32 px-6 scroll-mt-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-surface-deep border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1470&auto=format&fit=crop" 
                alt="Working"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              />
            </div>
            {/* Decal */}
            <div className="absolute bottom-2 right-2 p-6 lg:-bottom-6 lg:-right-6 lg:p-10 bg-primary/10 backdrop-blur-xl rounded-2xl border border-primary/20">
               <span className="text-primary font-space font-bold text-4xl">8.0</span>
               <span className="block text-[10px] text-white/40 uppercase tracking-widest mt-2">Overall CGPA</span>
            </div>
          </motion.div>

          <div className="space-y-10">
            <div>
              <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">About Me</span>
              <h2 className="text-4xl md:text-5xl font-space font-bold mb-8 leading-tight">
                Integrating Hardware <br />
                <span className="italic text-[#D6D6D6]/40">With Cognitive Intelligence.</span>
              </h2>
              <p className="text-[#D6D6D6]/70 text-lg leading-relaxed font-sans mb-8">
                {data.about.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {data.about.highlight_stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
                >
                  <span className="block text-3xl font-space font-bold text-white mb-1">{stat.value}</span>
                  <span className="text-[10px] text-[#D6D6D6]/40 uppercase tracking-widest">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-white/5">
              <div>
                <span className="text-[10px] text-white/20 uppercase tracking-widest mb-4 block">Linguistic Profile</span>
                <div className="space-y-3">
                   {data.languages?.map((lang: any) => (
                     <div key={lang.name} className="flex justify-between items-center">
                        <span className="text-sm font-space text-white/80">{lang.name}</span>
                        <span className="text-[9px] font-mono text-primary/60 uppercase">{lang.level}</span>
                     </div>
                   ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] text-white/20 uppercase tracking-widest mb-4 block">Fields of interest</span>
                <div className="flex flex-wrap gap-2">
                   {data.interests?.map((interest: string) => (
                     <span key={interest} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-tight">
                        {interest}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
