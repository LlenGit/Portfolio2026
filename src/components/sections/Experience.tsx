import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Experience() {
  const { data } = usePortfolioStore();

  return (
    <section id="experience" className="py-32 px-6 bg-surface-deep/20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-20 text-center">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Professional Vector</span>
          <h2 className="text-5xl font-space font-bold">Work Experience.</h2>
        </div>

        <div className="space-y-12 relative before:absolute before:left-4 md:before:left-8 before:top-0 before:w-[1px] before:h-full before:bg-white/10">
          {data.experience.map((exp: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-10 md:pl-24 group"
            >
              {/* Dot */}
              <div className="absolute left-[10px] md:left-[30px] top-2 w-3 h-3 rounded-full bg-surface-mid border-2 border-primary/40 group-hover:bg-primary transition-colors" />
              
              <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-space font-bold text-white">{exp.role}</h3>
                    <p className="text-primary font-mono text-xs tracking-widest mt-1 uppercase">{exp.company}</p>
                  </div>
                  <span className="text-[10px] font-mono text-white/40 border border-white/10 px-3 py-1 rounded-full uppercase">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-[#D6D6D6]/60 leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
                {exp.location && (
                  <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    <span>Loc:</span>
                    <span className="text-white/40">{exp.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
