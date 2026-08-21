// Web Audio API Synthesizer for Nokia Symbian Key Clicks & Sounds

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playKeyClick(soundEnabled: boolean = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note key tick
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Ignore audio autoplay policy errors
  }
}

export function playSelectBeep(soundEnabled: boolean = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.setValueAtTime(1600, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // Ignore
  }
}

export function playNokiaMessageTune(soundEnabled: boolean = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Classic SMS Morse code 'S M S' (short-short-short, long-long, short-short-short)
    const notes = [
      { freq: 1046, duration: 0.08, delay: 0 },
      { freq: 1046, duration: 0.08, delay: 0.12 },
      { freq: 1046, duration: 0.08, delay: 0.24 },
      { freq: 1046, duration: 0.18, delay: 0.40 },
      { freq: 1046, duration: 0.18, delay: 0.62 },
      { freq: 1046, duration: 0.08, delay: 0.85 },
      { freq: 1046, duration: 0.08, delay: 0.97 },
      { freq: 1046, duration: 0.08, delay: 1.09 },
    ];

    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.delay);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + note.delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.delay + note.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + note.delay);
      osc.stop(ctx.currentTime + note.delay + note.duration + 0.01);
    });
  } catch {
    // Ignore
  }
}
