import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const SkillRow = ({ title, items, reverse = false }: { title: string, items: string[], reverse?: boolean }) => {
  return (
    <div className="py-6 space-y-4">
      <h4 className="text-[10px] text-white/30 uppercase tracking-[0.4em] px-6 md:px-12">{title}</h4>
      <div className="flex overflow-hidden group select-none infinite-scroll-mask">
        <motion.div
          animate={{ x: reverse ? [0, -100 + "%"] : [-100 + "%", 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-4 px-4"
        >
          {[...items, ...items, ...items, ...items].map((skill, idx) => (
            <div
              key={idx}
              className="px-8 py-4 rounded-xl bg-surface-deep border border-white/5 flex items-center justify-center min-w-[160px] hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group/skill"
            >
              <span className="text-sm font-space font-medium text-[#D6D6D6] group-hover/skill:text-primary transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills() {
  const { data } = usePortfolioStore();

  return (
    <section id="skills" className="py-32 bg-bg-dark border-y border-white/5">
      <div className="container mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
        <div className="max-w-xl">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Engine Room</span>
          <h2 className="text-5xl font-space font-bold">The Technical Arsenal.</h2>
        </div>
        <div className="text-right hidden md:block">
           <span className="text-[10px] text-white/20 uppercase tracking-[0.6em]">System_Capabilities_v4.2</span>
        </div>
      </div>

      <div className="space-y-4">
         {Object.entries(data.skills).map(([category, items], idx) => (
           <SkillRow 
             key={category} 
             title={category} 
             items={items as string[]} 
             reverse={idx % 2 === 1} 
           />
         ))}
      </div>
    </section>
  );
}
