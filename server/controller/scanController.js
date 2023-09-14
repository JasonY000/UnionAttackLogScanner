const fs = require('fs');
const path = require('path');
const scanImage = require('../functions/scanImage');
const scanController = {};

scanController.configScan = async (req, res, next) => {
  try {
    const directory = path.join(__dirname, `../images/temp`);
    const imageArr = await fs.promises.readdir(directory);
    const scanTextArr = await scanImage(imageArr);
    res.locals.result = scanTextArr[0];
    res.locals.originScan = scanTextArr[1];
    next();
  } catch (err) {
    next({
      log: 'error when configscan img',
      status: 500,
      message: { err: 'error when configscan img' },
    });
  }
};

// async function scanImage(imgPathArr) {
//   console.log(imgPathArr);
//   const worker = await createWorker();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
//   await worker.setParameters({
//     tessedit_pageseg_mode: PSM.SPARSE_TEXT,
//     tessedit_char_blacklist: '%$#!',
//   });
//   const scanSet = new Set();
//   const originText = [];
//   for (let i = 0; i < imgPathArr.length; i++) {
//     const imagePath = path.join(__dirname, `../images/temp/${imgPathArr[i]}`);
//     const imageLoaded = await fs.promises.readFile(imagePath);
//     const {
//       data: { text },
//     } = await worker.recognize(imageLoaded);
//     originText.push(text);
//     const names = onlyNames(text);
//     names.forEach((name) => scanSet.add(name));
//     console.log(scanSet);
//     //scanSet.add(onlyNames(text));
//   }
//   await worker.terminate();
//   return [Array.from(scanSet), originText];
// }

// function onlyNames(text) {
//   let regex = /[@]+/gm;
//   // to remove large spaces from image scan result, the reason why I used @ is because there are some stings with real spaces, replaceAll and spliting at ' ' makes the array much longer.
//   const textArr = text.replaceAll('\n', '@').toLowerCase().split(regex);
//   const filterReg2 = /[.,\s\\]/;
//   const numberText = /^\d+$/;
//   const result = [];
//   textArr.forEach((element, i) => {
//     if (
//       filterReg2.test(element) === false &&
//       element.length > 2 &&
//       numberText.test(element) === false
//     ) {
//       result.push(element);
//     }
//   });
//   return result;
// }

module.exports = scanController;
