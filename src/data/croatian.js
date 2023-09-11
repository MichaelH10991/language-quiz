import { v4 } from "uuid";

const greetings = [
  {
    id: 0,
    english: "Hi/Goodbye",
    englishOptions: ["hi", "goodbye", "good bye"],
    pronounce: "bok",
    foregin: "Bok",
  },
  {
    id: 1,
    english: "Good day",
    pronounce: "DOH-bahr-dahn",
    foregin: "Dobar dan",
  },
  {
    id: 2,
    english: "Good morning",
    foregin: "Dobro jutro",
  },
  {
    id: 3,
    english: "Good evening",
    foregin: "Dobra vecer",
    foreginDisplay: "Dobra večer",
  },
  {
    id: 4,
    english: "Goodnight",
    englishOptions: ["good night", "goodnight"],
    foregin: "Laku noc",
    pronounce: "lah-koo-notch",
    foreginDisplay: "Laku noč",
  },
  {
    id: 5,
    english: "Hello",
    foregin: "Zdravo",
  },
  {
    id: 6,
    english: "Goodbye",
    foregin: "Dovidenja",
    englishOptions: ["Goodbye", "good bye"],
    pronounce: "doh-vee-JEH-nyah",
    foreginDisplay: "Doviđenja",
  },
  {
    id: v4(),
    english: "Do you speak english",
    foregin: "GovoriS li engleski",
    foreginDisplay: "GovoriŠ li engleski",
  },
  {
    id: v4(),
    english: "how are you",
    foregin: "kako si",
  },
];

const responses = [
  {
    id: v4(),
    english: "Thank you",
    foregin: "Hvala",
    pronounce: "HVAH-lah",
  },
];

const resturaunt = [
  {
    id: v4(),
    english: "Check please",
    foregin: "Račun molim",
  },
  {
    id: v4(),
    english: "table for 2 people please",
    foregin: "stol za dva osobe molim",
  },
  {
    id: v4(),
    english: "table",
    foregin: "stol",
  },
  {
    id: v4(),
    english: "without meat",
    foregin: "bez mesa",
  },
  {
    id: v4(),
    english: "no dairy products",
    foregin: "nema mlijecnih proizvoda",
    foreginDisplay: "nema mliječnih proizvoda",
  },
  {
    id: v4(),
    english: "toilet",
    foregin: "zahod",
  },
];

const questions = [
  {
    id: v4(),
    english: "Where is",
    foregin: "Gdje je",
  },
];

const basics = [
  ...greetings,
  ...responses,
  ...questions,
  { id: v4(), english: "Please", foregin: "Molim" },
  {
    id: v4(),
    english: "You're welcome",
    englishOptions: ["youre welcome", "you're welcome"],
    foregin: "Nema na cemu",
    foreginDisplay: "Nema na čemu",
    pronounce: "NEH-mah na CHEH-moo",
  },
  { id: v4(), english: "Yes", foregin: "Da" },
  { id: v4(), english: "No", foregin: "Ne" },
  {
    id: v4(),
    english: "Excuse me/sorry",
    englishOptions: ["excuse me", "sorry"],
    foregin: "Oprostite",
    pronounce: "oh-PROHS-tee-teh",
  },
  {
    id: v4(),
    english: "cheers",
    foregin: "Nazdravlje",
    pronounce: "NAHZ-drahv-yah",
  },
];

const numbers = [
  {
    id: v4(),
    english: "one",
    foregin: "jedan",
  },
  {
    id: v4(),
    english: "two",
    foregin: "dva",
  },
  {
    id: v4(),
    english: "three",
    foregin: "tri",
  },
  {
    id: v4(),
    english: "four",
    foregin: "cetiri",
    foreginDisplay: "četiri",
  },
  {
    id: v4(),
    english: "five",
    foregin: "pet",
  },
  {
    id: v4(),
    english: "six",
    foregin: "sest",
    foreginDisplay: "sešt",
  },
  {
    id: v4(),
    english: "seven",
    foregin: "sedam",
  },
  {
    id: v4(),
    english: "eight",
    foregin: "osam",
  },
  {
    id: v4(),
    english: "nine",
    foregin: "devet",
  },
  {
    id: v4(),
    english: "ten",
    foregin: "deset",
  },
];

const ret = {
  basics: basics,
  greetings: greetings,
  responses: responses,
  resturaunt: resturaunt,
  numbers: numbers,
};

export default ret;
