'use client';

import React, { useRef } from 'react';
import ImageWithLoading from '@/components/ui/ImageWithLoading';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowRight, Users, Zap, Target, Globe, Heart } from 'lucide-react';
import content from '../../../data/content.json';

// --- Reusable Animation Variants (Self-contained) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// --- Theme Constants ---
// Matching your existing intricate shadows
const SHADOW_PILL = "shadow-[0px_0.7px_0.7px_-0.5px_rgba(0,0,0,0.1),0px_1.8px_1.8px_-1px_rgba(0,0,0,0.09),0px_3.6px_3.6px_-1.6px_rgba(0,0,0,0.09),0px_6.9px_6.9px_-2.2px_rgba(0,0,0,0.09),0px_13.6px_13.6px_-2.7px_rgba(0,0,0,0.08),0px_30px_30px_-3.3px_rgba(0,0,0,0.05),inset_0px_3px_1px_0px_rgba(255,255,255,1)]";
const SHADOW_CARD = "shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.08),inset_0px_1px_1px_0px_rgba(255,255,255,0.8)]";
const BG_COLOR = "bg-[#f5f5f5]";

// --- Components ---

const Badge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: any }) => (
  <div className={`inline-flex items-center gap-2 px-5 py-2 ${BG_COLOR} border border-[#ffffff] rounded-full mb-6 ${SHADOW_PILL}`}>
    {Icon && <Icon className="w-3.5 h-3.5 text-black/40" />}
    <span className="font-sans text-xs font-medium tracking-wider text-black/40 uppercase">
      {children}
    </span>
  </div>
);

const SectionHeading = ({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4">
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={fadeInUp}
      >
        <Badge icon={Globe}>{badge}</Badge>
        <h2 className="text-4xl md:text-[56px] font-medium tracking-tight leading-[1.1] text-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

const StatCard = ({ number, label, delay }: { number: string; label: string; delay: number }) => (
  <motion.div
    variants={fadeInUp}
    className={`flex flex-col items-center justify-center p-8 rounded-[24px] ${BG_COLOR} border border-white/60 ${SHADOW_CARD}`}
  >
    <span className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight">{number}</span>
    <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</span>
  </motion.div>
);

const ValueCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: any }) => (
  <motion.div
    variants={fadeInUp}
    className={`group relative p-8 md:p-10 rounded-[32px] ${BG_COLOR} border border-white/60 ${SHADOW_CARD} overflow-hidden hover:shadow-lg transition-all duration-500`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
      <Icon className="w-24 h-24 text-black" />
    </div>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm`}>
        <Icon className="w-6 h-6 text-black" />
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-black mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const TeamMember = ({ name, role, image }: { name: string; role: string; image: string }) => (
  <motion.div variants={scaleIn} className="flex flex-col items-center group">
    <div className={`relative w-64 h-80 mb-6 rounded-[32px] overflow-hidden ${SHADOW_CARD} border border-white/50`}>
      <ImageWithLoading 
        src={image} 
        alt={name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
        sizes="(max-width: 768px) 100vw, 256px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    <h4 className="text-xl font-semibold text-black">{name}</h4>
    <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wide">{role}</p>
  </motion.div>
);

const iconMap: Record<string, any> = {
  zap: Zap,
  heart: Heart,
  target: Target,
  users: Users,
  globe: Globe
};

// --- Main Page Component ---

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const { about } = content;

  return (
    <div ref={containerRef} className={`min-h-screen ${BG_COLOR} text-black font-sans selection:bg-black/10`}>
      
      {/* 1. Hero Section */}
      {!about.hero.hidden && (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden">
          <div className="max-w-[1200px] mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex justify-center">
                <Badge icon={Target}>{about.hero.badge}</Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-[80px] font-semibold tracking-tight leading-[1.1] mb-8 text-black"
                dangerouslySetInnerHTML={{ __html: about.hero.title }}
              />

              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                {about.hero.description}
              </motion.p>
            </motion.div>
          </div>

          {/* Abstract Background Element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] -z-0 pointer-events-none opacity-40">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f5f5]/50 to-[#f5f5f5]" />
             {/* Simple grid pattern */}
             <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
          </div>
        </section>
      )}

      {/* 2. Stats Section */}
      {!about.stats.hidden && (
        <section className="py-12 border-y border-black/5 bg-white/50 backdrop-blur-sm">
          <div className="max-w-[1200px] mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            >
              {about.stats.items.map((stat, index) => (
                  <StatCard key={index} number={stat.number} label={stat.label} delay={index * 0.1} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. The Story / Manifesto */}
      {!about.story.hidden && (
        <section className="py-24 md:py-32 px-4 relative">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={scaleIn}
               className={`aspect-square rounded-[40px] overflow-hidden ${SHADOW_CARD} relative`}
            >
               <ImageWithLoading 
                 src={about.story.image} 
                 alt="Team meeting" 
                 fill
                 className="object-cover"
                 sizes="(max-width: 1024px) 100vw, 50vw"
               />
               {/* Overlay Badge */}
               <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-lg">
                  <p className="font-medium text-black italic">{about.story.quote}</p>
                  <p className="text-sm text-gray-500 mt-2">{about.story.quoteAuthor}</p>
               </div>
            </motion.div>

            <div>
               <SectionHeading 
                 badge={about.story.badge} 
                 title={about.story.title} 
                 subtitle="" // Handled in body
               />
               <motion.div 
                 initial="hidden"
                 whileInView="visible"
                 viewport={{ once: true }}
                 variants={staggerContainer}
                 className="space-y-6 text-lg text-gray-600 -mt-12"
               >
                  {about.story.paragraphs.map((paragraph, index) => (
                      <motion.p key={index} variants={fadeInUp}>
                        {paragraph}
                      </motion.p>
                  ))}
                  
                  <motion.div variants={fadeInUp} className="pt-8">
                    <button className="group flex items-center gap-3 text-black font-semibold text-lg hover:gap-4 transition-all">
                      {about.story.ctaText} <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
               </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Core Values Grid */}
      {!about.values.hidden && (
        <section className="py-24 md:py-32 px-4 bg-white rounded-[48px] mx-4 md:mx-8 shadow-inner">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeading 
              badge={about.values.badge} 
              title={about.values.title} 
              subtitle={about.values.subtitle}
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {about.values.items.map((item, index) => {
                  const Icon = iconMap[item.icon] || Target;
                  return (
                      <ValueCard 
                        key={index}
                        title={item.title} 
                        description={item.description}
                        icon={Icon}
                      />
                  );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. Team Section */}
      {!about.team.hidden && (
        <section className="py-24 md:py-32 px-4">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeading 
              badge={about.team.badge} 
              title={about.team.title} 
              subtitle={about.team.subtitle}
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-wrap justify-center gap-12 md:gap-16"
            >
              {about.team.members.map((member, index) => (
                  <TeamMember 
                    key={index}
                    name={member.name} 
                    role={member.role} 
                    image={member.image} 
                  />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5.5 Backers Section */}
      {!about.backers.hidden && (
        <section className={`py-24 md:py-32 px-4 ${BG_COLOR}`}>
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                {about.backers.title}
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {about.backers.subtitle}
              </p>
            </motion.div>

            {about.backers.logos.length > 5 ? (
              // Marquee for more than 5 logos
              <div className="relative overflow-hidden">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="flex gap-6"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {/* First set of logos */}
                  {about.backers.logos.map((logo, index) => (
                    <div
                      key={`logo-1-${index}`}
                      className={`flex-shrink-0 flex items-center justify-center w-[200px] h-[120px] p-8 bg-white rounded-2xl ${SHADOW_CARD}`}
                    >
                      <ImageWithLoading
                        src={logo.image}
                        alt={logo.alt}
                        width={160}
                        height={80}
                        className="w-auto h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {about.backers.logos.map((logo, index) => (
                    <div
                      key={`logo-2-${index}`}
                      className={`flex-shrink-0 flex items-center justify-center w-[200px] h-[120px] p-8 bg-white rounded-2xl ${SHADOW_CARD}`}
                    >
                      <ImageWithLoading
                        src={logo.image}
                        alt={logo.alt}
                        width={160}
                        height={80}
                        className="w-auto h-12 object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            ) : (
              // Static centered grid for 5 or fewer logos
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
              >
                {about.backers.logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className={`flex items-center justify-center w-[200px] h-[120px] p-8 bg-white rounded-2xl ${SHADOW_CARD} hover:shadow-lg transition-shadow duration-300`}
                  >
                    <ImageWithLoading
                      src={logo.image}
                      alt={logo.alt}
                      width={160}
                      height={80}
                      className="w-auto h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* 6. Footer CTA */}
      {!about.cta.hidden && (
        <section className="py-20 px-4">
          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={scaleIn}
             className={`max-w-[1200px] mx-auto rounded-[48px] bg-black text-white p-12 md:p-24 text-center relative overflow-hidden ${SHADOW_CARD}`}
          >
             {/* Abstract Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
             
             <div className="relative z-10">
               <h2 className="text-4xl md:text-6xl font-medium mb-8">{about.cta.title}</h2>
               <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10">{about.cta.subtitle}</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                 {about.cta.buttons.map((button, index) => (
                     <button key={index} className={`px-8 py-4 rounded-full font-semibold text-lg transition-colors ${button.variant === 'primary' ? 'bg-white text-black hover:bg-gray-100' : 'bg-transparent border border-white/20 text-white hover:bg-white/10'}`}>
                       {button.label}
                     </button>
                 ))}
               </div>
             </div>
          </motion.div>
        </section>
      )}

    </div>
  );
};

export default AboutPage;
