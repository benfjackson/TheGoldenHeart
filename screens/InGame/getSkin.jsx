import BasicSkin from '../../skins/Basic/BasicSkin';

export default function getSkin(skinID) {
  const basic = require('../../skins/Basic/BasicSkin');
  console.log('getSkin', skinID);
  const skinMap = {
    // Devil:
    // VampireGirl: require('../../skins/VampireGirl'),
    // GloriousElk: require('../../skins/GloriousElk'),
    // Kraken: require('../../skins/Kraken'),
    // LightningDragon: require('../../skins/LightningDragon'),
    // Angel: require('../../skins/Angel'),
    // Arisen: require('../../skins/Arisen'),
    // Druid: require('../../skins/Druid'),
    // HallOfSpirits: require('../../skins/HallOfSpirits'),
    // TheUnborn: require('../../skins/TheUnborn')
  };
  console.log('getSkin', skinMap[skinID]);
  return skinMap[skinID] || basic;
}
