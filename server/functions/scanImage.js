const fs = require('fs');
const path = require('path');
const {createWorker, PSM} = require('tesseract.js');

module.exports = async function scanImage(imgPathArr) {
  console.log(imgPathArr);
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    tessedit_char_blacklist: '%$#!',
  });

  const scanSet = new Set();
  const originText = [];
  //foreach image in file
  for (let i = 0; i < imgPathArr.length; i++) {
    const imagePath = path.join(__dirname, `../images/temp/${imgPathArr[i]}`);
    const imageLoaded = await fs.promises.readFile(imagePath);
    const {
      data: {text},
    } = await worker.recognize(imageLoaded);
    const [names, textArr] = onlyNames(text);
    originText.push(textArr);
    //foreach string extracted from a image.
    names.forEach((name) => scanSet.add(name));
  }
  await worker.terminate();
  return [Array.from(scanSet), originText];
};

function onlyNames(text) {
  let regex = /[@]+/gm;
  const textArr = text
    .replaceAll('\n', '@')
    .toLowerCase()
    .split(regex)
    .filter((text) => text.length > 2);
  const filterReg2 = /[.,\\]/;
  const xSpace = /^x\s/;
  const numberText = /^\d+$/;
  const result = [];
  textArr.forEach((element, i) => {
    //console.log(element);
    // if (numberText.test(element) === true) textArr[i] = parseFloat(element);
    if (
      !filterReg2.test(element) &&
      element.length > 2 &&
      !numberText.test(element) &&
      !xSpace.test(element) &&
      !element.includes(' ')
    ) {
      result.push(element);
    }
  });
  // console.log(textArr);
  return [result, textArr];
}
