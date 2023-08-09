const createUrl = (phrase) =>
  `https://translate.google.comm/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    phrase
  )}&tl=hr&client=tw-ob`;

const getDataSources = (phrases) => {
  console.log(phrases);
  return Object.keys(phrases).map((phrase) => {
    const url = createUrl(phrase.foregin);
    const audioSource = new Audio(url);
    return { id: phrase.id, audioSource };
  });
};

export default getDataSources;
