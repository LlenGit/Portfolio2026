import { motion } from 'motion/react';
import { Trophy, Medal, Star, Award } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const IconMap: Record<string, any> = {
  Trophy,
  Medal,
  Star,
  Award
};

export default function Achievements() {
  const { data } = usePortfolioStore();

  return (
    <section className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Decorations</span>
            <h2 className="text-5xl font-space font-bold">Mission Milestones.</h2>
          </div>
          <div className="text-right">
            <p className="text-[#D6D6D6]/40 text-sm max-w-xs ml-auto">
              Recognition of engineering excellence and creative problem-solving across various councils.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.achievements.map((item: any, idx: number) => {
            const Icon = IconMap[item.icon] || Award;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 md:p-10 rounded-3xl bg-surface-deep/40 border border-white/5 hover:border-primary/20 transition-all duration-500 flex flex-col sm:flex-row gap-6 sm:gap-8 group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase mb-3 block">
                    {item.date}
                  </span>
                  <h3 className="text-2xl font-space font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#D6D6D6]/60 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
