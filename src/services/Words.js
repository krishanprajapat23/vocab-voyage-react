import axios from 'axios';

const WORDS_API_URL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json";
const DICTIONARY_API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";


const getWordsList = () => {
  return axios.get(WORDS_API_URL).then(response => response.data);
};

const getDictionaryWord = (word) => {
  return axios.get(`${DICTIONARY_API_URL}${word}`).then(response => response.data);
};

export default { getWordsList, getDictionaryWord };
