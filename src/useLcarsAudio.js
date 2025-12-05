// Lightweight LCARS-inspired audio cues using the Web Audio API.
// Avoids bundling binary assets by synthesizing tones on the fly.
import { useCallback, useRef } from "react";

export default function useLcarsAudio() {
  const ctxRef = useRef(null);

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctxRef.current = new AudioCtx();
    return ctxRef.current;
  }, []);

  const playTone = useCallback(
    (frequency, duration, type, volume) => {
      const ctx = ensureContext();
      if (!ctx) return;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.value = volume;

      oscillator.connect(gain).connect(ctx.destination);

      const now = ctx.currentTime;
      oscillator.start(now);
      // Fade out quickly to avoid clicks at the end of the tone.
      gain.gain.setTargetAtTime(0, now + duration * 0.6, duration * 0.4);
      oscillator.stop(now + duration);
    },
    [ensureContext]
  );

  const playNav = useCallback(() => {
    playTone(620, 0.12, "sine", 0.08);
  }, [playTone]);

  const playAffirm = useCallback(() => {
    playTone(520, 0.08, "square", 0.1);
    setTimeout(() => playTone(1040, 0.08, "square", 0.08), 60);
  }, [playTone]);

  const playDismiss = useCallback(() => {
    playTone(240, 0.18, "sawtooth", 0.08);
  }, [playTone]);

  return { playNav, playAffirm, playDismiss };
}
