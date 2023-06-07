import Modal from 'react-native-modal';

import { Button, Text, View } from 'react-native';

export default function CardModal({ isOpen, setIsOpen, ...props }) {
  //   const [isModalVisible, setModalVisible] = useState(false);

  const topImage = require('../images/UI/frameTop.png');
  const bottomImage = require('../images/UI/frameBottom.png');

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      {...props}>
      <View>
        <View
          style={{
            backgroundColor: '#000',
            height: 100,
            width: 100,
            borderRadius: 10,
            flexDirection: 'column',
            flex: 1
          }}>
          <Image
            source={topImage}
            //Absolute top
            style={{ position: 'absolute', top: 0 }}
          />
          <Image
            source={bottomImage}
            //Absolute bottom
            style={{ position: 'absolute', bottom: 0 }}
          />
        </View>
      </View>
    </Modal>
  );
}
