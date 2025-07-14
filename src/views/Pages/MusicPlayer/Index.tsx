import React, { useEffect, useRef, useState } from "react";
import { Slider } from "../../../components/ui/slider";
 
const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [eqNodes, setEqNodes] = useState<BiquadFilterNode[]>([]);
  const [pitchRate, setPitchRate] = useState(1);
 
  //const audioPath = `http://localhost:5000/proxy?url=https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3`;
  const audioPath = "http://nel-dev-qa.s3.ap-south-1.amazonaws.com/audio2.mp3";
 
  const handleAudioInit = () => {
    if (!audioRef.current || audioCtx) return;
 
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = ctx.createMediaElementSource(audioRef.current);
    const gain = ctx.createGain();
    gain.gain.value = 1;
 
    const eq = [60, 170, 350, 1000, 3500, 10000].map((freq) => {
      const filter = ctx.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = freq;
      filter.Q.value = 1;
      filter.gain.value = 0;
      return filter;
    });
 
    // Connect EQ chain
    source.connect(eq[0]);
    eq.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });
    eq[eq.length - 1].connect(gain);
    gain.connect(ctx.destination);
 
    setAudioCtx(ctx);
    setEqNodes(eq);
 
    // Resume context when play starts
    ctx.resume().then(() => {
      console.log("AudioContext resumed and EQ initialized.");
    });
  };
 
  const handleEQChange = (index: number, value: number) => {
    if (eqNodes[index]) {
      eqNodes[index].gain.value = value;
      setEqNodes([...eqNodes]);
    }
  };
 
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Live Demo Music Player</h2>
 
      <audio
        ref={audioRef}
        controls
        crossOrigin="anonymous"
        preload="auto"
        onPlay={handleAudioInit}
      >
        <source src={audioPath} type="audio/mpeg" />
      </audio>
 
      <div>
        <label className="block font-semibold mb-1">
          Playback Speed / Pitch
        </label>
        <Slider
          min={0.5}
          max={2.0}
          step={0.01}
          value={[pitchRate]}
          onValueChange={([val]) => {
            if (audioRef.current) {
              audioRef.current.playbackRate = val;
            }
            setPitchRate(val);
          }}
        />
      </div>
 
      <div>
        <label className="block font-semibold mb-1">EQ Settings</label>
        {eqNodes.map((eqObj, i) => (
          <div key={i} className="my-2">
            <label className="text-sm">
              Band {i + 1} ({eqObj.frequency.value} Hz)
            </label>
            <Slider
              min={-12}
              max={12}
              step={1}
              value={[eqNodes[i].gain.value]}
              onValueChange={([val]) => handleEQChange(i, val)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default MusicPlayer;
 