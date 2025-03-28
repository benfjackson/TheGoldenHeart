import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Image,
  ImageBackground
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import DragQueen from './TutorialDragQueen';
import Sparkles from '../../components/Sparkle/Sparkles';
import PopupMenu from './TutorialMenu';
import ScreenFrame from '../../components/ScreenFrame';
import { fonts } from '../../styles';

export default function Tutorial() {
  const [life, setLife] = useState(20);

  const [menuOpen, setMenuOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState('tapUp');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const tutorialStages = {
    lifeTotal: {
      text: 'This is your life total',
      styling: { justifyContent: 'flex-end' },
      next: 'tapUp'
    },
    tapUp: {
      text: (
        <Text>
          <Text>Tap above for +</Text>
          <Text style={styles.numberText}>1</Text> <Text>health</Text>
        </Text>
      ),
      styling: { justifyContent: 'flex-start' },
      next: 'tapDown'
    },
    tapDown: {
      text: (
        <Text>
          <Text>Tap below for</Text> <Text style={styles.numberText}>-1</Text>{' '}
          <Text>health</Text>
        </Text>
      ),
      styling: { justifyContent: 'flex-end' },
      next: 'trackingNumber'
    },
    trackingNumber: {
      text: 'The number below tracks the recent health change',
      styling: { justifyContent: 'flex-end' },
      next: 'swipeUp'
    },
    swipeUp: {
      text: 'Swipe up to make your life go up',
      styling: { justifyContent: 'flex-start' },
      next: 'again'
    },
    again: {
      text: 'Do it again, it will keep getting tracked...',
      styling: { justifyContent: 'flex-start' },
      next: 'swipeDown'
    },
    swipeDown: {
      text: 'Swipe down to make your life go down',
      styling: { justifyContent: 'flex-end' },
      next: 'menu'
    },
    menu: {
      text: 'Tap up here for the menu',
      styling: { justifyContent: 'flex-start', paddingTop: '10%' },
      next: null // No next step; tutorial ends
    }
  };
  const menuButton = require('../../images/popupButton.png');

  const nextStep = (passedNextKey) => {
    console.log(currentStep, ' currStep');
    console.log(passedNextKey, ' passedNextKey');

    const nextKey = passedNextKey || tutorialStages[currentStep].next;
    if (!nextKey) {
      return;
    }
    console.log('nextKey', nextKey);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setCurrentStep(nextKey);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  // To be used for timeout progressions
  useEffect(() => {
    if (['trackingNumber', 'lifeTotal'].includes(currentStep)) {
      setTimeout(nextStep, 5000);
    }
  }, [currentStep]);

  return (
    <>
      <PopupMenu isOpen={menuOpen} setIsOpen={setMenuOpen} />
      <View style={{ flex: 1, width: '100%', height: '100%' }}>
        <ScreenFrame>
          <View
            style={[styles.textContainer, tutorialStages[currentStep].styling]}>
            <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
              {tutorialStages[currentStep].text}
            </Animated.Text>
          </View>
          <Pressable
            style={{
              position: 'absolute',
              top: 40,
              left: 40,
              zIndex: 10,
              opacity: currentStep === 'menu' ? 1 : 0
            }}
            onPress={() => setMenuOpen(true)}>
            <Sparkles on={currentStep === 'menu'}>
              <ImageBackground
                source={menuButton}
                style={{ width: 80, height: 80 }}
              />
            </Sparkles>
          </Pressable>
          <DragQueen
            life={life}
            setLife={setLife}
            textColour={'#FFA500a0'}
            tutorialState={currentStep}
            setTutorialState={nextStep}
          />
        </ScreenFrame>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFA500a0',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: fonts.readableText,
    width: '80%'
  },
  numberText: {
    color: '#FFA500a0',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: fonts.number,
    width: '80%'
  },
  textContainer: {
    flex: 1,
    width: '100%',
    height: '80%',
    position: 'absolute',
    alignItems: 'center',
    zIndex: -1
    // alignSelf: 'center'
  }
});
