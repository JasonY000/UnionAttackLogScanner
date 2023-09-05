import { scanImage } from './scanningImage.js';
export async function startDetection() {
  //fetch all the image name in nikkeLog file.
  const imageArr = await fetch('http://localhost:3000/api/images').then(
    (res) => {
      return res.json();
    }
  );
  const result = await scanImage(imageArr);

  // pass all the image name into scanImage function.
  // clean up function to compile all the scanned and managed data.
  const track = {};
  result.forEach((arr) => {
    for (let i = 0; i < arr.length; i += 2) {
      if (track[arr[i]] === undefined) {
        track[arr[i]] = { attack: 1, damage: arr[i + 1] };
      } else {
        track[arr[i]].attack++;
        track[arr[i]].damage = track[arr[i]].damage += arr[i + 1];
      }
    }
  });
  return track;
}
