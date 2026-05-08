/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import Keyboard from './components/Keyboard';
import Sidebar from './components/Sidebar';
import { KeyboardState, LAYOUT_60, PRESETS } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Keyboard as KeyboardIcon, Cpu } from 'lucide-react';

const INITIAL_STATE: KeyboardState = {
  caseColor: '#1a1a1a',
  keycaps: PRESETS['Carbon'],
  showLegends: true,
  profile: 'Cherry'
};

export default function App() {
  const [state, setState] = useState<KeyboardState>(INITIAL_STATE);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default common browser shortcuts to keep focus in app
    if (['Tab', 'Space', 'Meta', 'Alt'].includes(e.code) || (e.ctrlKey && e.code === 'KeyR')) {
      // e.preventDefault();
    }
    
    setPressedKeys(prev => {
      const next = new Set(prev);
      next.add(e.code);
      return next;
    });
    setLastKeyPressed(e.key);
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    setPressedKeys(prev => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="flex h-screen w-full bg-[#E6E6E6] text-surface-matte font-sans overflow-hidden">
      {/* Custom Sidebar */}
      <Sidebar 
        state={state} 
        setState={setState} 
        onReset={() => setState(INITIAL_STATE)} 
      />

      {/* Main Studio Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Studio Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-white/50 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-[100px]" />
          
          {/* Engineering-style Grid */}
          <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />
        </div>

        {/* Top Bar Status */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary font-mono">Current Build</span>
              <span className="text-sm font-semibold tracking-tight">K-60 CUSTOM_SERIES</span>
            </div>
            <div className="h-8 w-px bg-black/10" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-secondary font-mono">Status</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-mono font-medium">RENDERING_OK</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-black/5 shadow-sm">
                <Cpu className="w-4 h-4 text-blue-500" />
                <div className="flex flex-col">
                    <span className="text-[8px] uppercase tracking-tighter text-secondary font-mono">Real-time Hook</span>
                    <span className="text-[10px] font-bold font-mono">
                      {lastKeyPressed ? lastKeyPressed.toUpperCase() : 'NO_SIGNAL'}
                    </span>
                </div>
            </div>
          </div>
        </div>

        {/* The Keyboard Visualization */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="perspective-1000 z-10"
        >
          <Keyboard 
            layout={LAYOUT_60} 
            state={state} 
            pressedKeys={pressedKeys} 
          />
        </motion.div>

        {/* Interactive Tip */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-secondary bg-white/40 backdrop-blur-md px-4 py-2 rounded-lg border border-black/5 shadow-sm transition-all hover:bg-white/60 group cursor-help">
          <Info className="w-3 h-3 group-hover:text-blue-500 transition-colors" />
          <span className="text-[10px] font-mono tracking-tight">TYPE ON YOUR PHYSICAL KEYBOARD TO SEE FEEDBACK</span>
        </div>

        {/* Designer Credits / Specs Tag */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 opacity-40">
           <span className="text-[8px] font-mono uppercase tracking-[0.3em]">Hardware ID: KS-9942</span>
           <span className="text-[8px] font-mono uppercase tracking-[0.3em]">Simulated in AIS Engine</span>
        </div>
      </main>
    </div>
  );
}

