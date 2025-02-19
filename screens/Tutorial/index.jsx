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

export default function Tutorial() {
  const [life, setLife] = useState(20);

  const [menuOpen, setMenuOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState('tapUp');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const tutorialStages = {
    lifeTotal: {
      text: 'This is your life total',
      padding: { paddingTop: '10%', paddingBottom: '80%' },
      next: 'tapUp'
    },
    tapUp: {
      text: 'Tap above for +1 health',
      padding: { paddingTop: '-20%', paddingBottom: '100%' },
      next: 'tapDown'
    },
    tapDown: {
      text: 'Tap below for -1 health',
      padding: { paddingTop: '100%', paddingBottom: '-20%' },
      next: 'trackingNumber'
    },
    trackingNumber: {
      text: 'This tracks how much your health has just changed',
      padding: { paddingTop: '100%', paddingBottom: '-20%' },
      next: 'swipeUp'
    },
    swipeUp: {
      text: 'Swipe up from anywhere for large life gain',
      padding: { paddingTop: '100%', paddingBottom: '-20%' },
      next: 'again'
    },
    again: {
      text: 'Do it again, it will keep getting tracked...',
      padding: { paddingTop: '100%', paddingBottom: '-20%' },
      next: 'swipeDown'
    },
    swipeDown: {
      text: 'Swipe down to reduce your health',
      padding: { paddingTop: '100%', paddingBottom: '-20%' },
      next: 'menu'
    },
    menu: {
      text: 'Tap up here for the menu',
      padding: { paddingTop: '-20%', paddingBottom: '130%' },
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
        <View
          style={[styles.textContainer, tutorialStages[currentStep].padding]}>
          <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
            {tutorialStages[currentStep].text}
          </Animated.Text>
        </View>
        <Pressable
          style={{
            position: 'absolute',
            top: 40,
            left: 5,
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
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#FFA500a0',
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Endor'
  },
  textContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1
  }
});
