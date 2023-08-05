import React, { useState, useEffect } from "react";

const createUrl = (phrase) =>
  `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    phrase
  )}&tl=hr&client=tw-ob`;

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const ListenButton = ({ phrase }) => {
  const url = createUrl(phrase);

  const [playing, toggle] = useAudio(url);

  return (
    <div>
      <button onClick={toggle}>{playing ? "Pause" : "Play Audio"}</button>
    </div>
  );
};

export default ListenButton;
