import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <div className="relative h-[80vh] w-[80vw] flex-shrink-0 group">
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-surface-deep border border-white/5">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent opacity-80" />
      </div>

      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
        <div className="max-w-2xl">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-[10px] text-primary font-mono uppercase tracking-widest">
                {tech}
              </span>
            ))}
          </div>
          
          <h3 className="text-2xl md:text-5xl font-space font-bold text-white mb-4 md:mb-6 leading-tight group-hover:italic transition-all duration-700">
            {project.title}
          </h3>
          
          <p className="text-[#D6D6D6]/80 text-sm md:text-lg font-sans mb-6 md:mb-8 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-700 opacity-100 translate-y-0">
            {project.description}
          </p>
          
          <div className="flex gap-6 md:opacity-0 md:group-hover:opacity-100 transition-all duration-700 delay-100 opacity-100">
             <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-space font-bold tracking-[0.2em] text-white hover:text-primary grayscale hover:grayscale-0">
               <Github className="w-4 h-4" />
               REPOS_SRC
             </a>
             <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-space font-bold tracking-[0.2em] text-white hover:text-primary grayscale hover:grayscale-0">
               <ExternalLink className="w-4 h-4" />
               LIVE_NODE
             </a>
          </div>
        </div>
      </div>
      
      {/* Decorative ID */}
      <div className="absolute top-12 left-12 font-mono text-4xl text-white/5 font-bold">
        0{index + 1}
      </div>
    </div>
  );
};

export default function Projects() {
  const { data } = usePortfolioStore();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[400vh] bg-bg-dark">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-12 md:left-24 z-20">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block">Selected Works</span>
          <h2 className="text-6xl md:text-8xl font-space font-bold tracking-tighter text-white">PROJECTS.</h2>
        </div>

        <motion.div style={{ x }} className="flex gap-20 px-12 md:px-24">
          {data.projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
          {/* Padding element for end of scroll */}
          <div className="w-[20vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}
