//optimise later
export function getMiniImage(skinID) {
  const imageMap = {
    Angel: require('../skins/Basic/Angel/mini.png'),
    DeathAngel: require('../skins/Basic/DeathAngel/mini.png'),
    Devil: require('../skins/Basic/Devil/mini.png'),
    Druid: require('../skins/Basic/Druid/mini.png'),
    Elk: require('../skins/Basic/Elk/mini.png'),
    GreenVampire: require('../skins/Basic/GreenVampire/mini.png'),
    HallOfSpirits: require('../skins/Basic/HallOfSpirits/mini.png'),
    Kraken: require('../skins/Basic/Kraken/mini.png'),
    LightningDragon: require('../skins/Basic/LightningDragon/mini.png'),
    NobleVampire: require('../skins/Basic/NobleVampire/mini.png'),
    RedSkullVampire: require('../skins/Basic/RedSkullVampire/mini.png'),
    Werewolf: require('../skins/Basic/Werewolf/mini.png'),
    Swamp: require('../skins/Basic/Swamp/mini.png'),
    Island: require('../skins/Basic/Island/mini.png'),
    Plains: require('../skins/Basic/Plains/mini.png'),
    Mountain: require('../skins/Basic/Mountain/mini.png'),
    Forest: require('../skins/Basic/Forest/mini.png'),
    Waves: require('../skins/two_player/basic/Waves/mini.png'),
    Waves4player: require('../skins/four_player/basic/Waves/mini.png'),
    Quadrants: require('../skins/four_player/basic/Quadrants/mini.png')
  };
  return imageMap[skinID];
}
export function getSkinData(skinID) {
  //load data from json file
  const dataMap = {
    Angel: require('../skins/Basic/Angel/data.json'),
    DeathAngel: require('../skins/Basic/DeathAngel/data.json'),
    Devil: require('../skins/Basic/Devil/data.json'),
    Druid: require('../skins/Basic/Druid/data.json'),
    Elk: require('../skins/Basic/Elk/data.json'),
    GreenVampire: require('../skins/Basic/GreenVampire/data.json'),
    HallOfSpirits: require('../skins/Basic/HallOfSpirits/data.json'),
    Kraken: require('../skins/Basic/Kraken/data.json'),
    LightningDragon: require('../skins/Basic/LightningDragon/data.json'),
    NobleVampire: require('../skins/Basic/NobleVampire/data.json'),
    RedSkullVampire: require('../skins/Basic/RedSkullVampire/data.json'),
    Werewolf: require('../skins/Basic/Werewolf/data.json'),
    Swamp: require('../skins/Basic/Swamp/data.json'),
    Island: require('../skins/Basic/Island/data.json'),
    Plains: require('../skins/Basic/Plains/data.json'),
    Mountain: require('../skins/Basic/Mountain/data.json'),
    Forest: require('../skins/Basic/Forest/data.json'),
    Waves: require('../skins/two_player/basic/Waves/data.json'),
    Waves4player: require('../skins/four_player/basic/Waves/data.json'),
    Quadrants: require('../skins/four_player/basic/Quadrants/data.json')
  };
  //parse the json into a js object
  const data = dataMap[skinID];
  return data;
}

export function getSkinsInfo(favourites) {
  const data = favourites?.map((skin) => {
    const skinData = {
      skinID: skin,
      miniImage: getMiniImage(skin),
      data: getSkinData(skin)
    };
    return skinData;
  });

  return data;
}
