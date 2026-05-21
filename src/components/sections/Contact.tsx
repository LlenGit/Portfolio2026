import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export default function Contact() {
  const { data } = usePortfolioStore();

  return (
    <section id="contact" className="py-40 px-6 relative overflow-hidden bg-bg-dark">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 rounded-full" />
      
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-16">
          <div className="flex flex-col items-center space-y-6">
            <span className="text-primary font-mono text-sm tracking-widest uppercase block">Signal Gateway</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-space font-bold text-white tracking-tighter leading-none">
              Let's <span className="text-primary">Collaborate.</span>
            </h2>
            <p className="text-[#D6D6D6]/60 text-lg font-sans max-w-lg mx-auto">
              Ready to bridge the gap between high-stakes hardware and intelligent vision. 
              Inquiries for architectural consulting or deep-tech ventures preferred.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-all mb-4">
                <Mail className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-1">Transmission</span>
              <p className="text-white font-space font-medium text-sm md:text-base break-all">{data.profile.email}</p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-all mb-4">
                <Phone className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-1">Direct Line</span>
              <p className="text-white font-space font-medium text-sm md:text-base">{data.profile.phone}</p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-primary/40 transition-all mb-4">
                <MapPin className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-[10px] text-white/20 uppercase tracking-[0.3em] block mb-1">Coordinates</span>
              <p className="text-white font-space font-medium text-sm md:text-base">{data.profile.location}</p>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Github, link: data.profile.social.github },
              { icon: Linkedin, link: data.profile.social.linkedin },
              { icon: Instagram, link: data.profile.social.instagram }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
