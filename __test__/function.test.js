import { clearUp } from '../src/functions/clearUp.js';
describe('Testing functions', () => {
  describe('Testing Function Chain', () => {
    const img1Text =
      'hazewise@@@@@221,547,802@@x cucumber@@56.1@@troy@@@@@130,777,536@@x cucumber@@4h4.6@@troy@@v722@@n7@@133,466,810@@x cucumber@@81.2@@troy@@v725@@\t7@@81,701,208@@0.0@@x thermite b@@vs@@chiefy@@7@@336,002,046@@15@@x thermite b@@chiefy@@@@@213487,331@@y43.6@@x thermite b@';
    const img2Text =
      'miimi@@@@@330,572 826@@y.6@@x land eater@@vanilabr@@@@@261,524,682@@x land eater@@16.9@@vanilabr@@@@@118,933,077@@x cucumber@@0.0@@vanilabr@@0725@@\t7@@303798431@@x cucumber@@10.0@@hazewise@@vs@@7@@12,869,638@@354@@x cucumber@@hazewise@@@@@175,314,142@@n.5@@x cucumber@';
    const img3Text =
      'b@@0725@@7@@63,975,451@@x rebuild vulcan r@@h485@@vs@@2@@7@@240,312,073@@545@@x rebuild vulcan r@@yarly@@@@@113,501,090@@06.4@@x rebuild vulcan r@@yarly@@@@@144,036,643@@86.9@@x rebuild vulcan r@@mimi@@@@@264,124,524@@0.0@@x land eater@@yarly@@n7@@v722@@211,888,936@@x land eater@@235@';
    const textArr = [img1Text, img2Text, img3Text];
    it('return', async () => {
      const result = textArr.map((text) => clearUp(text));
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
      console.log(track);
    });
  });
});
//
