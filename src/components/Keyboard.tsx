import { motion } from 'motion/react';
import { KeyboardLayout, KeyboardState, KeyType } from '../types';

interface KeyboardProps {
  layout: KeyboardLayout;
  state: KeyboardState;
  pressedKeys: Set<string>;
}

export default function Keyboard({ layout, state, pressedKeys }: KeyboardProps) {
  const getBackgroundColor = (type: KeyType) => {
    switch (type) {
      case 'alphas': return state.keycaps.alphas;
      case 'modifiers': return state.keycaps.modifiers;
      case 'accent': return state.keycaps.accent;
      default: return '#cccccc';
    }
  };

  const unitSize = 40; // Base size for 1u keycap in pixels (responsive-ish)

  return (
    <div 
      className="p-8 rounded-2xl transition-colors duration-500 shadow-2xl relative overflow-hidden"
      style={{ 
        backgroundColor: state.caseColor,
        border: `8px solid ${state.caseColor}`,
        boxShadow: `inset 0 4px 12px rgba(0,0,0,0.4), 0 20px 40px rgba(0,0,0,0.3)`
      }}
    >
      <div className="flex flex-col gap-1">
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {row.map((key, keyIndex) => {
              const isPressed = pressedKeys.has(key.code);
              const bgColor = getBackgroundColor(key.type);
              
              return (
                <motion.div
                  key={`${rowIndex}-${keyIndex}`}
                  initial={false}
                  animate={{
                    y: isPressed ? 4 : 0,
                    scale: isPressed ? 0.98 : 1,
                  }}
                  className={`
                    relative rounded-md flex items-center justify-center
                    font-mono font-medium text-[10px] sm:text-xs select-none
                    ${isPressed ? 'key-active' : 'key-shadow'}
                  `}
                  style={{
                    width: `${key.width * unitSize}px`,
                    height: `${key.height * unitSize}px`,
                    backgroundColor: bgColor,
                    color: state.keycaps.legend,
                    transition: 'background-color 0.3s ease, border-color 0.3s ease',
                    borderTop: `1px solid rgba(255,255,255,0.15)`,
                    borderLeft: `1px solid rgba(255,255,255,0.1)`,
                  }}
                >
                  {state.showLegends && (
                    <span className="opacity-80 translate-y-[-1px]">
                      {key.label}
                    </span>
                  )}
                  
                  {/* Subtle 3D effect details */}
                  <div className="absolute inset-0 rounded-md pointer-events-none border border-black/5" />
                  <div 
                    className="absolute inset-x-[1px] top-[1px] h-[20%] rounded-t-md pointer-events-none opacity-20"
                    style={{ background: 'linear-gradient(to bottom, white, transparent)' }}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Texture simulation for plastic case */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-bundle-overlay" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} />
    </div>
  );
}
