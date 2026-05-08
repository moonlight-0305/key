export type KeyType = 'alphas' | 'modifiers' | 'accent';

export interface KeyDefinition {
  code: string;
  label: string;
  width: number; // in units (1u = 1)
  height: number;
  type: KeyType;
}

export interface KeyboardLayout {
  rows: KeyDefinition[][];
}

export interface KeycapState {
  alphas: string;
  modifiers: string;
  accent: string;
  legend: string;
}

export interface KeyboardState {
  caseColor: string;
  keycaps: KeycapState;
  showLegends: boolean;
  profile: 'Cherry' | 'OEM' | 'DSA' | 'XDA';
}

export const PRESETS: Record<string, KeycapState> = {
  'Carbon': {
    alphas: '#e6e6e6',
    modifiers: '#333333',
    accent: '#ff6600',
    legend: '#1a1a1a'
  },
  'Laser': {
    alphas: '#3d164d',
    modifiers: '#201140',
    accent: '#ff0055',
    legend: '#00ffcc'
  },
  'Botanical': {
    alphas: '#e9e9e1',
    modifiers: '#4d5d53',
    accent: '#9ba495',
    legend: '#4d5d53'
  },
  'Minimal': {
    alphas: '#ffffff',
    modifiers: '#ffffff',
    accent: '#f2f2f2',
    legend: '#222222'
  },
  'Bento': {
    alphas: '#ffffff',
    modifiers: '#ef64a3',
    accent: '#2f4f7f',
    legend: '#2f4f7f'
  }
};

export const LAYOUT_60: KeyboardLayout = {
  rows: [
    // Row 0
    [
      { code: 'Escape', label: 'ESC', width: 1, height: 1, type: 'accent' },
      { code: 'Digit1', label: '1', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit2', label: '2', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit3', label: '3', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit4', label: '4', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit5', label: '5', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit6', label: '6', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit7', label: '7', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit8', label: '8', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit9', label: '9', width: 1, height: 1, type: 'alphas' },
      { code: 'Digit0', label: '0', width: 1, height: 1, type: 'alphas' },
      { code: 'Minus', label: '-', width: 1, height: 1, type: 'alphas' },
      { code: 'Equal', label: '=', width: 1, height: 1, type: 'alphas' },
      { code: 'Backspace', label: 'BKSP', width: 2, height: 1, type: 'modifiers' },
    ],
    // Row 1
    [
      { code: 'Tab', label: 'TAB', width: 1.5, height: 1, type: 'modifiers' },
      { code: 'KeyQ', label: 'Q', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyW', label: 'W', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyE', label: 'E', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyR', label: 'R', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyT', label: 'T', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyY', label: 'Y', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyU', label: 'U', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyI', label: 'I', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyO', label: 'O', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyP', label: 'P', width: 1, height: 1, type: 'alphas' },
      { code: 'BracketLeft', label: '[', width: 1, height: 1, type: 'alphas' },
      { code: 'BracketRight', label: ']', width: 1, height: 1, type: 'alphas' },
      { code: 'Backslash', label: '\\', width: 1.5, height: 1, type: 'alphas' },
    ],
    // Row 2
    [
      { code: 'CapsLock', label: 'CAPS', width: 1.75, height: 1, type: 'modifiers' },
      { code: 'KeyA', label: 'A', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyS', label: 'S', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyD', label: 'D', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyF', label: 'F', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyG', label: 'G', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyH', label: 'H', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyJ', label: 'J', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyK', label: 'K', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyL', label: 'L', width: 1, height: 1, type: 'alphas' },
      { code: 'Semicolon', label: ';', width: 1, height: 1, type: 'alphas' },
      { code: 'Quote', label: '\'', width: 1, height: 1, type: 'alphas' },
      { code: 'Enter', label: 'ENTER', width: 2.25, height: 1, type: 'modifiers' },
    ],
    // Row 3
    [
      { code: 'ShiftLeft', label: 'SHIFT', width: 2.25, height: 1, type: 'modifiers' },
      { code: 'KeyZ', label: 'Z', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyX', label: 'X', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyC', label: 'C', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyV', label: 'V', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyB', label: 'B', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyN', label: 'N', width: 1, height: 1, type: 'alphas' },
      { code: 'KeyM', label: 'M', width: 1, height: 1, type: 'alphas' },
      { code: 'Comma', label: ',', width: 1, height: 1, type: 'alphas' },
      { code: 'Period', label: '.', width: 1, height: 1, type: 'alphas' },
      { code: 'Slash', label: '/', width: 1, height: 1, type: 'alphas' },
      { code: 'ShiftRight', label: 'SHIFT', width: 2.75, height: 1, type: 'modifiers' },
    ],
    // Row 4
    [
      { code: 'ControlLeft', label: 'CTRL', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'MetaLeft', label: 'WIN', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'AltLeft', label: 'ALT', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'Space', label: '', width: 6.25, height: 1, type: 'alphas' },
      { code: 'AltRight', label: 'ALT', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'MetaRight', label: 'WIN', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'ContextMenu', label: 'MENU', width: 1.25, height: 1, type: 'modifiers' },
      { code: 'ControlRight', label: 'CTRL', width: 1.25, height: 1, type: 'modifiers' },
    ]
  ]
};
