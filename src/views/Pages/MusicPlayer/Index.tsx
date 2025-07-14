import React, { useEffect, useRef, useState } from "react";
//import { Slider } from "@/components/ui/slider";
import { Slider } from "../../../components/ui/slider";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLVideoElement | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [sourceNode, setSourceNode] =
    useState<MediaElementAudioSourceNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);
  const [reverbNode, setReverbNode] = useState<ConvolverNode | null>(null);
  const [eqNodes, setEqNodes] = useState<BiquadFilterNode[]>([]);
  const [eqNodesValue, setEqNodesValue] = useState<BiquadFilterNode[]>([]);
  const [pitchRate, setPitchRate] = useState(1);

  useEffect(() => {
    console.log("audioCtx", audioCtx, audioRef.current);
    if (!audioCtx && audioRef.current) {
      const ctx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const source = ctx.createMediaElementSource(audioRef.current);

      const gain = ctx.createGain();
      const reverb = ctx.createConvolver();
      const eq = [60, 170, 350, 1000, 3500, 10000].map((freq) => {
        const filter = ctx.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = freq;
        filter.Q.value = 1;
        filter.gain.value = 0;
        return filter;
      });

      source.connect(eq[0]);
      eq.reduce((prev, curr) => {
        prev.connect(curr);
        return curr;
      });
      eq[eq.length - 1].connect(reverb);
      reverb.connect(gain);
      gain.connect(ctx.destination);

      setAudioCtx(ctx);
      setSourceNode(source);
      setGainNode(gain);
      setReverbNode(reverb);
      setEqNodes(eq);

      console.log("eq", eq);

      // Load dummy reverb impulse
      /* fetch("/impulse.wav")
        .then((response) => response.arrayBuffer())
        .then((buffer) => ctx.decodeAudioData(buffer))
        .then((decoded) => {
          reverb.buffer = decoded;
        }); */
    }
  }, []);

  const handleEQChange = (index, value) => {
    console.log("index", index, "value", value);
    if (eqNodes[index]) {
      eqNodes[index].gain.value = value;
      setEqNodesValue([...eqNodes]);
    }
  };

  useEffect(() => {
    console.log("eqNodes:::", eqNodes);
  }, [eqNodes]);

  console.log("eqNodesValue >>>", eqNodesValue);

  //https://sidechayn.sfo3.digitaloceanspaces.com/sidechayn/audio/01_Yes.mp3
  //https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Live Demo Music Player</h2>

      {/* <video
        ref={audioRef}
        controls
        onRateChange={(e) =>
          setPitchRate((e.target as HTMLMediaElement).playbackRate)
        }
      >
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the video tag.
      </video> */}

      <audio
        ref={audioRef}
        controls
        onRateChange={(e) =>
          setPitchRate((e.target as HTMLAudioElement).playbackRate)
        }
      >
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
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
