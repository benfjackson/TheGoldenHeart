//optimise later

export function getMiniImage(skinID) {
  const imageMap = {
    Angel: require('../skins/Basic/Angel/mini.png'),
    Devil: require('../skins/Basic/Devil/mini.png'),
    Druid: require('../skins/Basic/Druid/mini.png'),
    Elk: require('../skins/Basic/Elk/mini.png'),
    GreenVampire: require('../skins/Basic/GreenVampire/mini.png'),
    HallOfSpirits: require('../skins/Basic/HallOfSpirits/mini.png'),
    Kraken: require('../skins/Basic/Kraken/mini.png'),
    LightningDragon: require('../skins/Basic/LightningDragon/mini.png'),
    NobleVampire: require('../skins/Basic/NobleVampire/mini.png'),
    RedSkullVampire: require('../skins/Basic/RedSkullVampire/mini.png'),
    Werewolf: require('../skins/Basic/Werewolf/mini.png')
  };
  return imageMap[skinID];
}
export function getSkinData(skinID) {
  //load data from json file
  const dataMap = {
    Angel: require('../skins/Basic/Angel/data.json'),
    Devil: require('../skins/Basic/Devil/data.json'),
    Druid: require('../skins/Basic/Druid/data.json'),
    Elk: require('../skins/Basic/Elk/data.json'),
    GreenVampire: require('../skins/Basic/GreenVampire/data.json'),
    HallOfSpirits: require('../skins/Basic/HallOfSpirits/data.json'),
    Kraken: require('../skins/Basic/Kraken/data.json'),
    LightningDragon: require('../skins/Basic/LightningDragon/data.json'),
    NobleVampire: require('../skins/Basic/NobleVampire/data.json'),
    RedSkullVampire: require('../skins/Basic/RedSkullVampire/data.json'),
    Werewolf: require('../skins/Basic/Werewolf/data.json')
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
