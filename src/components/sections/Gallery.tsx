import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Gallery() {
  const { data } = usePortfolioStore();

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-20">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Visual Logs</span>
          <h2 className="text-5xl font-space font-bold">The Gallery.</h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {data.artbook.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative rounded-3xl overflow-hidden group border border-white/5 bg-surface-deep break-inside-avoid"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">{item.category}</span>
                <h3 className="text-xl font-space font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
