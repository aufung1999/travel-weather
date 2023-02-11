export default function countRepeatedWords(array) {
  console.log('array: ' + array)

  let words = array
  let wordMap = {};

  for (let i = 0; i < array.length; i++) {
    let currentWordCount = wordMap[words[i]];
    let count = currentWordCount ? currentWordCount : 0;
    wordMap[words[i]] = count + 1;
  }
  return wordMap;
}
