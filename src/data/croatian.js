import { v4 } from "uuid";

const greetings = [
  {
    id: 0,
    english: "Hello/Hi/Goodbye",
    englishOptions: ["hello", "hi", "goodbye", "good bye"],
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
    english: "Bill please",
    foregin: "Bill please (but in croatian)",
  },
  {
    id: v4(),
    english: "table for 2 people please",
    foregin: "stol za dva osobe molim",
  },
];

const basics = [
  ...greetings,
  ...responses,
  { id: v4(), english: "Please", foregin: "Molim" },
  {
    id: v4(),
    english: "You're welcome",
    englishOptions: ["youre welcome", "you're welcome"],
    foregin: "Nema na cemu",
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
    foreginOptions: ["Nazdravlje", "Zivijeli"],
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
    foreginDisplay: "sešestst",
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
