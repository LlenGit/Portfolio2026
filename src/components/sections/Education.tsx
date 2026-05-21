import { motion } from 'motion/react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Education() {
  const { data } = usePortfolioStore();

  return (
    <section className="py-32 px-6 bg-texture">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-20">
           <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Foundations</span>
           <h2 className="text-5xl font-space font-bold">Academic Dossier.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {data.education.map((edu: any, idx: number) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 relative overflow-hidden group"
             >
               <div className="relative z-10">
                 <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-mono text-[10px] tracking-widest uppercase mb-6">
                   {edu.duration}
                 </span>
                 <h3 className="text-2xl font-space font-bold text-white mb-2">{edu.degree}</h3>
                 <p className="text-primary-soft font-medium mb-4">{edu.institution}</p>
                 <div className="h-[1px] w-full bg-white/10 mb-6" />
                 <p className="text-[#D6D6D6]/60 text-sm italic font-serif">
                   {edu.detail}
                 </p>
               </div>
               
               {/* Background Glow */}
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors" />
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}
