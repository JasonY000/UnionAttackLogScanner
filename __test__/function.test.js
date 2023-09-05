import { clearUp } from '../src/functions/clearUp.js';
describe('Testing functions', () => {
  const img1Text =
    'hazewise@@@@@221,547,802@@x cucumber@@56.1@@troy@@@@@130,777,536@@x cucumber@@4h4.6@@troy@@v722@@n7@@133,466,810@@x cucumber@@81.2@@troy@@v725@@\t7@@81,701,208@@0.0@@x thermite b@@vs@@chiefy@@7@@336,002,046@@15@@x thermite b@@chiefy@@@@@213487,331@@y43.6@@x thermite b@';
  const img2Text =
    'miimi@@@@@330,572 826@@y.6@@x land eater@@vanilabr@@@@@261,524,682@@x land eater@@16.9@@vanilabr@@@@@118,933,077@@x cucumber@@0.0@@vanilabr@@0725@@\t7@@303798431@@x cucumber@@10.0@@hazewise@@vs@@7@@12,869,638@@354@@x cucumber@@hazewise@@@@@175,314,142@@n.5@@x cucumber@';
  const img3Text =
    'b@@0725@@7@@63,975,451@@x rebuild vulcan r@@h485@@vs@@2@@7@@240,312,073@@545@@x rebuild vulcan r@@yarly@@@@@113,501,090@@06.4@@x rebuild vulcan r@@yarly@@@@@144,036,643@@86.9@@x rebuild vulcan r@@mimi@@@@@264,124,524@@0.0@@x land eater@@yarly@@n7@@v722@@211,888,936@@x land eater@@235@';
  const textArr = [img1Text, img2Text, img3Text];
  it('ClearUp function should return fomatted array', async () => {
    // testing the cleanUp function.
    const result = textArr.map((text) => clearUp(text));
    let isFormat = true;
    for (const arr of result) {
      for (let i = 0; i < arr.length; i += 2) {
        if (typeof arr[i] !== 'string' && typeof arr[i + 1] !== 'number') {
          isFormat = false;
        }
      }
    }
    expect(isFormat).toBe(true);
  });
});
//
