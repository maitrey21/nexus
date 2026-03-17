"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReturnPortalButton from "./ReturnPortalButton"

interface SponsorsSectionProps {
  onReturn: () => void
}

const N8N_COLOR = "#EA4B71"
const ELECTROLYTE_COLOR = "#FFD700"
const MATRIX_GREEN = "#00ff41"

export default function SponsorsSection({ onReturn }: SponsorsSectionProps) {
  const [bootSequence, setBootSequence] = useState(0)

  useEffect(() => {
    // Sequence boot animations
    const t1 = setTimeout(() => setBootSequence(1), 500)
    const t2 = setTimeout(() => setBootSequence(2), 1200)
    const t3 = setTimeout(() => setBootSequence(3), 2000)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-y-auto overflow-x-hidden"
      style={{ background: "#020403" }}
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: "url('/assets/portals/The_Allies.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Matrix Scanline Background Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
        style={{
          backgroundImage: "linear-gradient(to bottom, transparent 50%, #00e676 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-20 w-full max-w-5xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2
            className="text-2xl sm:text-4xl md:text-6xl tracking-widest mb-4 uppercase"
            style={{
               fontFamily: "Glitch, sans-serif",
               letterSpacing: "clamp(4px, 1.5vw, 10px)",
               color: "#7dffb2",
               textShadow: "0 0 10px rgba(0,230,118,0.4)",
            }}
          >
            THE ALLIES
          </h2>
          <div
            className="h-px w-48 mx-auto mb-4"
            style={{ background: "linear-gradient(to right, transparent, #00e676, transparent)" }}
          />
          <p
             className="font-mono text-xs sm:text-sm tracking-[0.25em]"
             style={{ color: "rgba(159,230,184,0.5)" }}
          >
            OUR SPONSORS
          </p>
        </motion.div>

        {/* Sponsor Cards Layout */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24">
          
          {/* Subtle node connection line (Visible on desktop between cards) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-px hidden md:block opacity-50 z-0">
             <div className="w-full h-full relative" style={{ background: "linear-gradient(to right, rgba(0,255,65,0.2), rgba(0,255,65,0.8), rgba(0,255,65,0.2))" }}>
                {bootSequence >= 3 && (
                   <motion.div 
                     initial={{ left: "0%" }}
                     animate={{ left: "100%" }}
                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                     className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_8px_#00ff41]"
                     style={{ background: MATRIX_GREEN }}
                   />
                )}
             </div>
          </div>

          <SponsorCard 
            sponsorName="n8n"
            sponsorColor={N8N_COLOR}
            linkText="n8n.io"
            bootSequence={bootSequence}
            delay={0}
          >
             <div className="flex justify-center items-center w-full h-24">
                <img 
                   src="/assets/n8n-logo.png" 
                   alt="n8n logo"
                   className="h-full w-auto object-contain brightness-0 invert opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0"
                   style={{
                     filter: "brightness(0) invert(1)" // initially white, on hover it transitions in CSS
                   }}
                />
             </div>
          </SponsorCard>

            <SponsorCard 
              sponsorName="ELECTROLYTE"
              sponsorColor={ELECTROLYTE_COLOR}
              linkText="electrolyte"
              bootSequence={bootSequence}
              delay={0.2}
            >
              {/* Electrolyte custom image logo */}
              <div className="relative flex items-center justify-center w-[250px] h-[100px] overflow-hidden transition-all duration-300">
                <div className="absolute w-[250px] h-[250px] flex items-center justify-center pointer-events-none group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/assets/electrolyte-logo.jpg" 
                    alt="Electrolyte logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </SponsorCard>

        </div>
      </div>

      <ReturnPortalButton onReturn={onReturn} />
    </motion.section>
  )
}

function SponsorCard({ 
  children, sponsorName, sponsorColor, linkText, bootSequence, delay 
}: { 
  children: React.ReactNode, sponsorName: string, sponsorColor: string, linkText: string, bootSequence: number, delay: number 
}) {
  const isBooted = bootSequence >= 2
  return (
    <div className="flex flex-col items-center z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={bootSequence >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, delay: delay }}
        className="group relative w-[280px] sm:w-[320px] bg-[rgba(0,0,0,0.7)] p-6 cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          border: `1px solid ${MATRIX_GREEN}`,
          boxShadow: `inset 0 0 30px ${sponsorColor}26`, // 0.15 hex is ~26
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = sponsorColor
          e.currentTarget.style.boxShadow = `inset 0 0 40px ${sponsorColor}40, 0 0 20px ${sponsorColor}33`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = MATRIX_GREEN
          e.currentTarget.style.boxShadow = `inset 0 0 30px ${sponsorColor}26`
        }}
      >
         {/* Corner Brackets */}
         <div className="absolute top-0 left-0 text-xl leading-none text-[#00ff41] font-mono group-hover:text-[var(--hover-color)] transition-colors p-1" style={{ '--hover-color': sponsorColor } as any}>╔</div>
         <div className="absolute top-0 right-0 text-xl leading-none text-[#00ff41] font-mono group-hover:text-[var(--hover-color)] transition-colors p-1" style={{ '--hover-color': sponsorColor } as any}>╗</div>
         <div className="absolute bottom-0 left-0 text-xl leading-none text-[#00ff41] font-mono group-hover:text-[var(--hover-color)] transition-colors p-1" style={{ '--hover-color': sponsorColor } as any}>╚</div>
         <div className="absolute bottom-0 right-0 text-xl leading-none text-[#00ff41] font-mono group-hover:text-[var(--hover-color)] transition-colors p-1" style={{ '--hover-color': sponsorColor } as any}>╝</div>

         {/* Scanline boot effect */}
         {!isBooted && bootSequence >= 1 && (
            <motion.div 
               initial={{ top: "-10%" }}
               animate={{ top: "110%" }}
               transition={{ duration: 1.5, ease: "linear" }}
               className="absolute left-0 right-0 h-4 bg-green-400/20 blur-sm z-20 pointer-events-none"
            />
         )}

         {/* Matrix rain hover effect context overlay */}
         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none overflow-hidden z-0 flex whitespace-pre font-mono text-xs text-[#00ff41] flex-wrap items-start justify-start p-2 leading-none">
            {Array.from({length: 100}).map((_, i) => Math.random() > 0.5 ? '1' : '0').join(' ')}
            <br />
            {Array.from({length: 100}).map((_, i) => Math.random() > 0.5 ? '0' : 'A').join(' ')}
            <br />
            {Array.from({length: 100}).map((_, i) => Math.random() > 0.5 ? 'X' : '1').join(' ')}
         </div>

         {/* Top Label */}
         <div className="font-mono text-sm tracking-widest text-[#00ff41] mb-8 relative z-10 group-hover:text-[var(--hover-color)] transition-colors" style={{ '--hover-color': sponsorColor } as any}>
            {">"} ALLY_IDENTIFIED
         </div>

         {/* Logo Container */}
         <div className="mb-8 relative z-10 mix-blend-screen px-4 min-h-[100px] flex items-center justify-center">
            {isBooted ? (
               <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
               >
                  {children}
               </motion.div>
            ) : (
               <div className="text-[#00ff41] font-mono text-xs animate-pulse opacity-50 flex items-center justify-center w-full h-full min-h-[100px]">
                  [ LOADING_ASSET... ]
               </div>
            )}
         </div>

         {/* Status */}
         <div className="font-mono text-xs tracking-widest text-[#00ff41] mt-auto relative z-10 group-hover:text-[var(--hover-color)] transition-colors flex items-center gap-2" style={{ '--hover-color': sponsorColor } as any}>
            <span className="animate-pulse">■</span> STATUS: CONNECTED
         </div>
      </motion.div>

      {/* Subtext */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={isBooted ? { opacity: 1 } : { opacity: 0 }}
         transition={{ duration: 0.5, delay: delay + 0.3 }}
         className="mt-4 font-mono text-[10px] sm:text-xs text-[#00ff41] opacity-60 tracking-widest uppercase"
      >
         {linkText}
      </motion.div>
    </div>
  )
}
