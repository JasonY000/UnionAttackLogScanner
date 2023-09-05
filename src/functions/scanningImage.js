import { clearUp } from './clearUp.js';
const { createWorker, PSM } = require('tesseract.js');
//the main function that scans the image.
export async function scanImage(imgPathArr) {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    tessedit_char_blacklist: '%$#!',
  });
  let cleared = [];
  for (let i = 0; i < imgPathArr.length; i++) {
    const {
      data: { text },
    } = await worker.recognize(require(`../nikkeLog/${imgPathArr[i]}`));
    cleared.push(clearUp(text));
  }
  await worker.terminate();
  return cleared;
}
