// import {scanImage} from './scanningImage';
// interface MemberPerformance {
//   attack: number;
//   damage: number;
// }
// export async function startDetection(): Promise<{
//   [key: string]: MemberPerformance;
// }> {
//   //fetch all the image name in nikkeLog file.
//   const imageArr = await fetch('http://localhost:3000/images').then((res) => {
//     return res.json();
//   });
//   const result = await scanImage(imageArr);
//   console.log('running TessDectect');
//   // pass all the image name into scanImage function.
//   // clean up function to compile all the scanned and managed data.
//   const track: {[key: string]: MemberPerformance} = {};
//   result.forEach((arr: any[]) => {
//     for (let i = 0; i < arr.length; i += 2) {
//       if (track[arr[i]] === undefined) {
//         track[arr[i]] = {attack: 1, damage: arr[i + 1]};
//       } else {
//         track[arr[i]].attack++;
//         track[arr[i]].damage = track[arr[i]].damage += arr[i + 1];
//       }
//     }
//   });
//   return track;
// }
