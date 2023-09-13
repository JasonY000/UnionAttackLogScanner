import { clearUp } from './clearUp';
const { createWorker, PSM } = require('tesseract.js');

//the main function that scans the image.
export async function scanImage(imgPathArr: any[]): Promise<any[]> {
  const worker = await createWorker();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    tessedit_char_blacklist: '%$#!',
  });
  const cleared: any[] = [];
  for (let i = 0; i < imgPathArr.length; i++) {
    const {
      data: { text },
      //`../nikkeLog/${imgPathArr[i]}`
    } = await worker.recognize(require('../nikkeLog/exampleImage.jpg'));
    const cleanedArr: any[] = clearUp(text);
    cleared.push(cleanedArr);
  }
  await worker.terminate();
  return cleared;
}
