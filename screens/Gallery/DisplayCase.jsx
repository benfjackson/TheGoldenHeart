import { ScrollView, View } from 'react-native';
import DisplaySkin from './DisplaySkin';
import { getSkinsInfo } from '../../services/getSkinInfo';
import { useState } from 'react';
import InspectSkinModal from './InspectSkinModal';

export default function DisplayCase() {
  // Should reflect owned skins?
  const skins = ['Angel', 'Devil', 'Kraken', 'Druid', 'Crab'];

  const skinsData = getSkinsInfo(skins);

  const [inspectingSkin, setInspectingSkin] = useState(null);
  const [inspectingSkinModalIsOpen, setInspectingSkinModalIsOpen] =
    useState(false);

  return (
    <>
      <InspectSkinModal
        isOpen={inspectingSkinModalIsOpen}
        setIsOpen={setInspectingSkinModalIsOpen}
        skin={inspectingSkin}
      />
      <View
        style={{
          height: '80%',
          width: '80%'
        }}>
        <ScrollView style={{ paddingTop: 50 }}>
          {skinsData.map((skin) => (
            <DisplaySkin
              skin={skin}
              key={skin?.data?.id}
              onPress={() => {
                setInspectingSkin(skin);
                setInspectingSkinModalIsOpen(true);
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
