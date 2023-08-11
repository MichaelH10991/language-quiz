import React, { useState, useRef } from "react";

const createUrl = (phrase) =>
  `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    phrase
  )}&tl=hr&client=tw-ob`;

const audioSync = (url) => {
  return new Promise((done) => {
    const audio = new Audio(url);
    done(audio);
  });
};

const ListenButton = ({ phrase, buttonText }) => {
  const [fetched, setFetched] = useState(1);
  // const [audio, setAudio] = useState(
  //   fetched === 1 && new Audio(createUrl(phrase))
  // );
  const [audio, setAudio] = useState();
  const previousValues = useRef({ phrase, fetched });

  /**
   * This is the key, it will only go and create a new audio tag when the phrase updates
   * and when the audio button it clicked. This is to save on unnecessariliy
   * loading audio from google's api.
   * We use useRef to create a memory of the two states so we can then evaluate
   * when they both change together.
   */
  // useCallback(() => {
  //   async function fetchAudio() {
  //     // check if both states have changed
  //     if (
  //       previousValues.current.phrase !== phrase &&
  //       previousValues.current.fetched !== fetched
  //     ) {
  //       /**
  //        * if they have it means:
  //        * 1. the word has changed (so fetch a new audio clip)
  //        * 2. the user has also clicked the playback button (so play it)
  //        */
  //       console.log("both states changed");
  //       const audio = await audioSync(createUrl(phrase));
  //       setAudio(audio);
  //       previousValues.current = { phrase, fetched };
  //     }
  //   }
  //   fetchAudio();
  // }, [fetched, phrase]);

  return (
    <div>
      <button
        onClick={async () => {
          setFetched(fetched + 1);
          if (
            previousValues.current.phrase !== phrase &&
            previousValues.current.fetched !== fetched
          ) {
            const audio = await audioSync(createUrl(phrase));
            audio.play();
            setAudio(audio);
            previousValues.current = { phrase, fetched };
          } else {
            if (fetched === 1) {
              const audio = await audioSync(createUrl(phrase));
              setAudio(audio);
              audio.play();
            } else {
              audio.play();
            }
          }
        }}
      >
        {buttonText || "Listen"}
      </button>
    </div>
  );
};

export default ListenButton;
