import React, { useRef, useState, useEffect } from "react";
import { Slider } from "../../../components/ui/slider";
import { FaHeart } from "react-icons/fa";

export default function AudioPlayer() {
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);
  const [showEqualizer, setShowEqualizer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [eqNodes, setEqNodes] = useState<BiquadFilterNode[]>([]);
  const [pitchRate, setPitchRate] = useState(1);
  const [reverbEnabled, setReverbEnabled] = useState(false);
  const convolverRef = useRef<{
    convolver: ConvolverNode;
    wetGain: GainNode;
  } | null>(null);

  const audioPath = "http://nel-dev-qa.s3.ap-south-1.amazonaws.com/audio2.mp3";
  const reverbAudioPath =
    "http://nel-dev-qa.s3.ap-south-1.amazonaws.com/audio1.wav";

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleSeek = (e) => {
    if (!progressRef.current) return;
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const handlePlaybackRateChange = (e) => {
    const newRate = parseFloat(e.target.value);
    setPlaybackRate(newRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
  };

  const toggleSpeedSlider = () => {
    setShowSpeedSlider(!showSpeedSlider);
    setShowEqualizer(false);
  };

  const toggleEqualizerPopup = () => {
    setShowEqualizer(!showEqualizer);
    setShowSpeedSlider(false);
  };

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

    //Reverb code
    const convolver = ctx.createConvolver();

    // Load impulse response for reverb
    fetch(reverbAudioPath)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
      .then((impulseBuffer) => {
        convolver.buffer = impulseBuffer;
      });

    const dryGain = ctx.createGain();
    const wetGain = ctx.createGain();

    dryGain.gain.value = 1;
    wetGain.gain.value = 0; // Initially off

    source.connect(dryGain).connect(ctx.destination);
    source.connect(convolver).connect(wetGain).connect(ctx.destination);

    convolverRef.current = { convolver, wetGain };

    setAudioCtx(ctx);
    setEqNodes(eq);
    //console.log("eq", eq);

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

  const toggleReverb = () => {
    if (!convolverRef.current) return;

    const { wetGain } = convolverRef.current;
    const isEnabled = wetGain.gain.value > 0;
    wetGain.gain.value = isEnabled ? 0 : 1;
    setReverbEnabled(!isEnabled);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[15vh] bg-[#1b1b1f] border-t border-gray-800 flex items-center justify-between px-6 text-sm z-50">
      <div className="relative w-full max-w-4xl mx-auto">
        {/* Equalizer Popup */}
        {showEqualizer && eqNodes.length > 0 && (
          <div className="absolute -top-70 left-0 right-0 mx-auto w-full bg-[#1e1e1e] rounded-lg p-6 z-20 shadow-xl">
            <h2 className="text-white font-semibold mb-4">Equalizer</h2>
            <div className="flex justify-between">
              {eqNodes.map((eqObj, i) => (
                <div key={i} className="flex flex-col items-center text-white">
                  <label className="mb-2">({eqObj.frequency.value} Hz)</label>
                  <input
                    type="range"
                    min={-12}
                    max={12}
                    step={1}
                    value={eqNodes[i].gain.value}
                    className="h-32 rotate-[-90deg]"
                    onChange={(e) => handleEQChange(i, Number(e.target.value))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Player */}
        <div className="flex items-center justify-between w-full">
          {/* Album Art */}
          {/* Left: Song Info */}
          <div className="flex items-center gap-4">
            <img
              src="./assets/track_img.png"
              alt="Album"
              className="w-12 h-12 rounded object-cover"
            />
            <div>
              <p className="text-white font-semibold text-sm">Stay</p>
              <p className="text-gray-400 text-xs">
                The Kid LAROI, Justin Bieber
              </p>
            </div>
            <FaHeart className="ml-4 text-gray-400 cursor-pointer hover:text-red-500" />
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-4">
              <button className="text-gray-400 " disabled>
                <img src="./assets/prev-track.svg" />
              </button>
              <button
                className="bg-white text-black rounded-full p-1.5 hover:scale-105 transition"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <img src="./assets/pause-btn.svg" />
                ) : (
                  <img src="./assets/play-btn.svg" />
                )}
              </button>
              <button className="text-gray-400" disabled>
                <img src="./assets/next-track.svg" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <div
                className="flex-1 mx-2 h-2 bg-gray-600 rounded-full cursor-pointer"
                ref={progressRef}
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 relative">
            {/* Speed Button */}
            <div className="relative flex">
              <button
                onClick={toggleSpeedSlider}
                className="text-sm text-white bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                title="Playback Speed"
              >
                {playbackRate}x
              </button>

              {showSpeedSlider && (
                <div className="absolute top-10 left-0 w-24 bg-gray-800 p-2 rounded shadow">
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.25"
                    value={playbackRate}
                    onChange={handlePlaybackRateChange}
                    className="w-full"
                  />
                </div>
              )}
              <button
                onClick={toggleReverb}
                title="Reverb"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
              >
                {reverbEnabled ? (
                  <img src="./assets/DisableReverb.svg" />
                ) : (
                  <img src="./assets/Reverb.svg" />
                )}
              </button>
            </div>

            {/* Equalizer Button */}
            <button
              onClick={toggleEqualizerPopup}
              className="text-gray-400 hover:text-white text-xl"
              title="Equalizer"
            >
              <img src="./assets/equalizer.svg" />
            </button>

            {/* Volume */}
            <span className="text-white">&#128266;</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 accent-white"
            />
          </div>

          {/* Audio Element */}
          <audio
            ref={audioRef}
            crossOrigin="anonymous"
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onPlay={handleAudioInit}
          >
            <source src={audioPath} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}
