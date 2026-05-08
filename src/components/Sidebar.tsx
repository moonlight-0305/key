import { KeyboardState, PRESETS } from '../types';
import { Palette, Keyboard, Type, Settings2, RotateCcw } from 'lucide-react';

interface SidebarProps {
  state: KeyboardState;
  setState: (state: KeyboardState) => void;
  onReset: () => void;
}

export default function Sidebar({ state, setState, onReset }: SidebarProps) {
  const updateKeycaps = (updates: Partial<typeof state.keycaps>) => {
    setState({
      ...state,
      keycaps: { ...state.keycaps, ...updates }
    });
  };

  const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (val: string) => void }) => (
    <div className="flex items-center justify-between group">
      <span className="text-[10px] uppercase tracking-widest text-secondary font-mono group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-mono text-secondary opacity-50">{value.toUpperCase()}</span>
        <input 
          type="color" 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded-full border-2 border-surface-matte cursor-pointer overflow-hidden bg-transparent"
        />
      </div>
    </div>
  );

  return (
    <div className="w-80 h-full bg-surface-matte text-white p-6 flex flex-col gap-8 border-r border-white/5 overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-[#00FF00]" />
          KeebStudio
        </h1>
        <button 
          onClick={onReset}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-secondary"
          title="Reset to Default"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Presets */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-secondary">
          <Palette className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Designer Presets</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(PRESETS).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => setState({ ...state, keycaps: preset })}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium border transition-all
                ${JSON.stringify(state.keycaps) === JSON.stringify(preset) 
                  ? 'border-[#00FF00] bg-[#00FF00]/10 text-white' 
                  : 'border-white/10 bg-white/5 text-secondary hover:border-white/30'}
              `}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Keycaps Colors */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-secondary">
          <Type className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Keycap Colors</span>
        </div>
        <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col gap-4">
          <ColorInput label="Alphas" value={state.keycaps.alphas} onChange={(val) => updateKeycaps({ alphas: val })} />
          <ColorInput label="Modifiers" value={state.keycaps.modifiers} onChange={(val) => updateKeycaps({ modifiers: val })} />
          <ColorInput label="Accent" value={state.keycaps.accent} onChange={(val) => updateKeycaps({ accent: val })} />
          <ColorInput label="Legend" value={state.keycaps.legend} onChange={(val) => updateKeycaps({ legend: val })} />
        </div>
      </section>

      {/* Case & Misc */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-secondary">
          <Settings2 className="w-3 h-3" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono">Physical Specs</span>
        </div>
        <div className="bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col gap-4">
          <ColorInput label="Case Material" value={state.caseColor} onChange={(val) => setState({ ...state, caseColor: val })} />
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] uppercase tracking-widest text-secondary font-mono">Legends</span>
            <button 
              onClick={() => setState({ ...state, showLegends: !state.showLegends })}
              className={`
                w-10 h-5 rounded-full relative transition-colors
                ${state.showLegends ? 'bg-[#00FF00]' : 'bg-secondary/20'}
              `}
            >
              <div 
                className={`
                  absolute top-1 w-3 h-3 bg-white rounded-full transition-all
                  ${state.showLegends ? 'left-6' : 'left-1'}
                `} 
              />
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[10px] uppercase tracking-widest text-secondary font-mono">Profile</span>
            <div className="flex gap-1">
              {['Cherry', 'OEM', 'DSA', 'XDA'].map((p) => (
                <button
                  key={p}
                  onClick={() => setState({ ...state, profile: p as any })}
                  className={`
                    flex-1 py-1.5 rounded-md text-[9px] font-mono border transition-all
                    ${state.profile === p 
                      ? 'border-[#00FF00] text-[#00FF00] bg-[#00FF00]/5' 
                      : 'border-white/5 text-secondary hover:bg-white/5'}
                  `}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="mt-auto pt-8 flex flex-col gap-2">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
            <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.1em]">Engine Link Active</span>
        </div>
        <p className="text-[10px] text-secondary leading-relaxed opacity-60">
          Hardware virtualization v1.2. Prototyping mode enabled.
        </p>
      </div>
    </div>
  );
}
