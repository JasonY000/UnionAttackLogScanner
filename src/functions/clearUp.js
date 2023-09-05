import { members } from './memberList';
// Function that aims to clean up tesseract.js image scan result
export function clearUp(text) {
  //console.log(text);
  let regex = /[@]+/gm;
  // to remove large spaces from image scan result, the reason why I used @ is because there are some stings with real spaces, replaceAll and spliting at ' ' makes the array much longer.
  const textArr = text.replaceAll('\n', '@').toLowerCase().split(regex);
  // UNCOMMENT LINE BELOW TO CHECK FOR ANY NAMES BEING MISS SCANNED.
  //console.log(textArr);
  let filtered = [];
  // the . filters out the health % number and the \ filters out tesseract.js scanning japanese name in my union.
  let filterReg2 = /[.\\]+/g;
  // used to turn string number with , into floats
  let filterReg4 = /[,]/g;
  textArr.forEach((element, i) => {
    // any members name and damage has to have a length of 2 or more.
    if (filterReg2.test(element) === false && element.length > 2) {
      // tesseract.js scans the image from left to right, so the order of the array is already formatted where there will be the name followed by the damage numbers
      // this is to check if the filtered array last element is a name string, because some array could have [name, damage, random data]
      if (
        filterReg4.test(element) &&
        typeof filtered[filtered.length - 1] === 'string'
      ) {
        filtered.push(parseFloat(element.replace(/[, ]/g, '')));
      } else if (element.length > 5 && /^\d+$/.test(element)) {
        filtered.push(parseFloat(element));
      }
      // add else if here (below is an exsample)
      else if (element === 'examplee 1') {
        filtered.push('example 1');
      } else if (members.has(element)) {
        filtered.push(element);
      }
    }
  });
  return filtered;
}
