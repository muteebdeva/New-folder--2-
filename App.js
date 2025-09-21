import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from 'react-native-slider';

import OnboardingScreen from './src/screens/OnboardingScreen';
import MainScreen from './src/screens/MainScreen';
import CompressScreen from './src/screens/CompressScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const { width } = Dimensions.get('window');

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [selectedImages, setSelectedImages] = useState([]);
  const [compressedImages, setCompressedImages] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    checkFirstLaunch();
    loadSettings();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched) {
        setIsFirstLaunch(false);
        setCurrentScreen('main');
      }
    } catch (error) {
      console.log('Error checking first launch:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      if (darkMode) {
        setIsDarkMode(JSON.parse(darkMode));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      setCurrentScreen('main');
    } catch (error) {
      console.log('Error completing onboarding:', error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={completeOnboarding} />;
      case 'main':
        return (
          <MainScreen
            onNavigate={setCurrentScreen}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            isDarkMode={isDarkMode}
          />
        );
      case 'compress':
        return (
          <CompressScreen
            images={selectedImages}
            onComplete={(compressed) => {
              setCompressedImages(compressed);
              setCurrentScreen('results');
            }}
            onBack={() => setCurrentScreen('main')}
            isDarkMode={isDarkMode}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            originalImages={selectedImages}
            compressedImages={compressedImages}
            onBack={() => setCurrentScreen('main')}
            isDarkMode={isDarkMode}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onBack={() => setCurrentScreen('main')}
          />
        );
      default:
        return <MainScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1a1a1a' : '#ffffff'}
      />
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
});

export default App;