/**
 * Synthesizes high-clarity wrist alert chimes using the Web Audio API.
 * Works seamlessly in Apple Watch WebKit without requiring external MP3 assets.
 */

export function playWristChime(type: 'rest_complete' | 'set_logged' | 'step_advance' = 'rest_complete'): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Resume context if suspended (common in mobile WebKit)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (type === 'rest_complete') {
      // 2-tone melodic chime: 880Hz (A5) -> 1760Hz (A6)
      const now = ctx.currentTime;
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.2);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1760, now + 0.18);
      gain2.gain.setValueAtTime(0.3, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.5);
    } else if (type === 'set_logged') {
      // Crisp confirmation click/pulse: 520Hz
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.1); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // Subtle transition tick
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (err) {
    // Graceful fallback if Web Audio is muted by system policy
    console.warn('Wrist chime audio not available:', err);
  }
}

export function triggerWristHaptic(pattern: 'click' | 'success' | 'alert' = 'click'): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (pattern === 'click') {
        navigator.vibrate(35);
      } else if (pattern === 'success') {
        navigator.vibrate([40, 25, 60]);
      } else if (pattern === 'alert') {
        navigator.vibrate([150, 80, 200, 80, 250]);
      }
    } catch {}
  }
}
