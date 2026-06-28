import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Zap, Magnet, Map, Clock, 
  LassoSelect, Brush, Wheat, Crosshair, Flame, 
  Compass, DollarSign, Target, CheckCircle2, ChevronRight
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Unsplash Images
const BG_URL = "https://images.unsplash.com/photo-1723581205530-c404f7f1831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBob3VyJTIwcm9sbGluZyUyMGdyYXNzbGFuZHMlMjByYW5jaCUyMGxhbmRzY2FwZSUyMGNvd2JveXxlbnwxfHx8fDE3ODI2NDY1NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const MINIMAP_TEX_URL = "https://images.unsplash.com/photo-1706790608211-4c03fd4f4d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjB2aW50YWdlJTIwcnVzdGljJTIwcGFwZXIlMjBtYXAlMjB0ZXh0dXJlfGVufDF8fHx8MTc4MjY0NjU1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function App() {
  const [time, setTime] = useState("17:45");
  const [questIndex, setQuestIndex] = useState(0);
  
  const quests = [
    "Deliver the stray cattle to the northern pen",
    "Return to the homestead before nightfall",
    "Time remaining: 1h 15m in-game"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestIndex((prev) => (prev + 1) % quests.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [quests.length]);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-barlow select-none text-foreground flex flex-col justify-between">
      {/* Cinematic Viewport */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between">
        {/* Top Letterbox */}
        <div className="h-[8vh] bg-black w-full z-50 relative shadow-[0_10px_20px_rgba(0,0,0,0.8)]"></div>
        
        {/* Main Background Image Container */}
        <div className="flex-1 relative overflow-hidden">
          <ImageWithFallback 
            src={BG_URL} 
            alt="Gameplay Background" 
            className="w-full h-full object-cover"
          />
          {/* Vignette & Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>

        {/* Bottom Letterbox */}
        <div className="h-[8vh] bg-black w-full z-50 relative shadow-[0_-10px_20px_rgba(0,0,0,0.8)]"></div>
      </div>

      {/* --- HUD LAYER --- */}
      <div className="absolute inset-0 z-10 pointer-events-none p-6 pb-8 flex flex-col justify-between">
        
        {/* Top Row: Player Card & Minimap */}
        <div className="flex justify-between items-start pt-[6vh]">
          
          {/* Top-Left: Player Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-start space-x-4 bg-card/80 backdrop-blur-sm p-3 rounded-lg border border-border pointer-events-auto"
          >
            {/* Level Badge */}
            <div className="flex flex-col items-center justify-center w-12 h-12 bg-secondary rounded border border-primary/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20"></div>
              <span className="font-rye text-primary text-xl z-10">14</span>
            </div>
            
            <div className="flex flex-col w-48 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-rye text-lg text-foreground tracking-wider">ARTHUR</span>
                <span className="font-mono text-xs text-muted-foreground">LVL 14</span>
              </div>
              
              {/* Vitals */}
              <div className="space-y-1.5">
                {/* Health */}
                <div className="flex items-center space-x-2">
                  <Heart className="w-3 h-3 text-destructive drop-shadow" fill="currentColor" />
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-black/30">
                    <motion.div 
                      className="h-full bg-destructive"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                {/* Stamina */}
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-primary drop-shadow" fill="currentColor" />
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-black/30">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
                {/* Horse Stamina */}
                <div className="flex items-center space-x-2">
                  <Magnet className="w-3 h-3 text-[#5D8AA8] drop-shadow" />
                  <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-black/30">
                    <motion.div 
                      className="h-full bg-[#5D8AA8]"
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Top-Right: Minimap & Clock */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-end space-y-3 pointer-events-auto"
          >
            {/* Minimap Circle */}
            <div className="relative w-40 h-40 rounded-full border-4 border-secondary/90 shadow-2xl overflow-hidden ring-2 ring-primary/40 bg-[#c5b399]">
              <ImageWithFallback 
                src={MINIMAP_TEX_URL} 
                alt="Map Texture" 
                className="absolute inset-0 w-[200%] h-[200%] object-cover opacity-60 mix-blend-multiply"
                style={{ transform: "translate(-25%, -25%) rotate(-15deg)" }}
              />
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              
              {/* Compass Markers */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] font-rye font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">N</div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-rye font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">S</div>
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[10px] font-rye font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">W</div>
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-rye font-bold text-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">E</div>

              {/* Player Arrow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Compass className="w-6 h-6 text-destructive drop-shadow-md" fill="currentColor" />
              </div>
              
              {/* Objective Marker */}
              <div className="absolute top-8 right-10">
                <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-primary rounded-full relative border border-black" />
              </div>
            </div>

            {/* Clock & Environment Info */}
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 px-4 py-1.5 rounded-full flex items-center space-x-3">
              <div className="flex items-center text-primary">
                <Clock className="w-4 h-4 mr-1.5" />
                <span className="font-mono text-sm">{time}</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <span className="font-rye text-xs tracking-wider uppercase text-muted-foreground">Day 12</span>
              <div className="w-px h-4 bg-border"></div>
              <span className="font-barlow text-sm uppercase text-foreground">72°F</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Hotbar & Status */}
        <div className="flex justify-between items-end pb-[6vh]">
          
          {/* Bottom-Left: Tool Hotbar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex items-end space-x-2 pointer-events-auto"
          >
            {[
              { id: 1, icon: LassoSelect, active: false, key: '1' },
              { id: 2, icon: Brush, active: false, key: '2' },
              { id: 3, icon: Wheat, active: false, key: '3' },
              { id: 4, icon: Crosshair, active: true, key: '4' },
              { id: 5, icon: Flame, active: false, key: '5' }
            ].map((tool) => (
              <div 
                key={tool.id} 
                className={`relative flex flex-col items-center justify-center transition-all duration-300 ${
                  tool.active 
                    ? 'w-14 h-14 bg-secondary border-2 border-primary shadow-[0_0_15px_rgba(212,146,42,0.4)]' 
                    : 'w-12 h-12 bg-card/60 border border-border/50 opacity-70 hover:opacity-100'
                } rounded backdrop-blur-sm`}
              >
                <div className="absolute -top-2 -left-2 w-5 h-5 bg-black rounded-full border border-border flex items-center justify-center">
                  <span className="font-mono text-[10px] text-primary">{tool.key}</span>
                </div>
                <tool.icon className={`w-6 h-6 ${tool.active ? 'text-primary' : 'text-foreground'}`} strokeWidth={tool.active ? 2.5 : 2} />
              </div>
            ))}
          </motion.div>

          {/* Bottom-Right: Ranch Status Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-72 flex flex-col space-y-3 pointer-events-auto"
          >
            {/* Quest Banner */}
            <div className="bg-card/90 backdrop-blur-md border border-primary/40 rounded-lg p-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-rye text-xs tracking-widest text-primary uppercase">Current Task</span>
              </div>
              <div className="h-10 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={questIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 font-barlow text-sm leading-tight text-foreground flex items-center"
                  >
                    {quests[questIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Resources Panel */}
            <div className="bg-secondary/90 backdrop-blur-md border border-border rounded-lg p-3 grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-barlow text-xs text-muted-foreground uppercase flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" /> Funds
                </span>
                <span className="font-mono text-lg text-[#85bb65] font-medium">$1,240.50</span>
              </div>
              <div className="flex flex-col">
                <span className="font-barlow text-xs text-muted-foreground uppercase flex items-center">
                  <span className="mr-1">🐄</span> Cattle
                </span>
                <span className="font-mono text-lg text-foreground font-medium">12 <span className="text-muted-foreground text-sm">/ 50</span></span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
      
      {/* Scanline / Grain overlay for extra cinematic feel */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay z-20"></div>
    </div>
  );
}
