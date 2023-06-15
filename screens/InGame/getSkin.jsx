import BasicSkin from '../../skins/Basic/BasicSkin';

export default function getSkin(skinID) {
  const basic = require('../../skins/Basic/BasicSkin');

  const skinMap = {};
  return skinMap[skinID] || basic;
}
