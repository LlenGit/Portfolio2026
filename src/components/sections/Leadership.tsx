import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Leadership() {
  const { data } = usePortfolioStore();

  return (
    <section className="py-32 px-6 bg-surface-deep/10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-20">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Auxiliary Core</span>
          <h2 className="text-5xl font-space font-bold">Leadership & Engagement.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.leadership.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              <h3 className="text-xl font-space font-bold text-white mb-2">{item.role}</h3>
              <p className="text-primary font-medium text-sm mb-4">{item.org}</p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                <span>Active:</span>
                <span>{item.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
