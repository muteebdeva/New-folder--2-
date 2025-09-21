import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ isDarkMode, setIsDarkMode, onBack }) => {
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newMode));
    } catch (error) {
      console.log('Error saving dark mode setting:', error);
    }
  };

  const clearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'This will remove all temporary compressed images. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            // Clear cache logic here
            Alert.alert('Success', 'Cache cleared');
          },
        },
      ]
    );
  };

  const resetSettings = async () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsDarkMode(false);
              Alert.alert('Success', 'Settings reset to default');
            } catch (error) {
              Alert.alert('Error', 'Could not reset settings');
            }
          },
        },
      ]
    );
  };

  const showAbout = () => {
    Alert.alert(
      'About ImageSize Compress',
      'Version 1.0.0\n\nA fast, mobile-first image compression app that reduces photo file size with minimal quality loss.\n\nBuilt with React Native',
      [{ text: 'OK' }]
    );
  };

  const settingsItems = [
    {
      title: 'Appearance',
      items: [
        {
          label: 'Dark Mode',
          value: isDarkMode ? 'On' : 'Off',
          onPress: toggleDarkMode,
        },
      ],
    },
    {
      title: 'Storage',
      items: [
        {
          label: 'Clear Cache',
          subtitle: 'Remove temporary files',
          onPress: clearCache,
        },
      ],
    },
    {
      title: 'General',
      items: [
        {
          label: 'Reset Settings',
          subtitle: 'Restore default settings',
          onPress: resetSettings,
        },
        {
          label: 'About',
          subtitle: 'App version and info',
          onPress: showAbout,
        },
      ],
    },
  ];

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, themeStyles.text]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsItems.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, themeStyles.text]}>
              {section.title}
            </Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={[styles.settingItem, themeStyles.card]}
                onPress={item.onPress}
              >
                <View style={styles.settingContent}>
                  <Text style={[styles.settingLabel, themeStyles.text]}>
                    {item.label}
                  </Text>
                  {item.subtitle && (
                    <Text style={[styles.settingSubtitle, themeStyles.secondaryText]}>
                      {item.subtitle}
                    </Text>
                  )}
                </View>
                
                {item.value && (
                  <Text style={[styles.settingValue, themeStyles.secondaryText]}>
                    {item.value}
                  </Text>
                )}
                
                <Text style={styles.settingArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Compression Presets</Text>
          
          <View style={[styles.presetCard, themeStyles.card]}>
            <Text style={[styles.presetTitle, themeStyles.text]}>Default Quality</Text>
            <Text style={[styles.presetValue, themeStyles.secondaryText]}>80%</Text>
          </View>
          
          <View style={[styles.presetCard, themeStyles.card]}>
            <Text style={[styles.presetTitle, themeStyles.text]}>Max Dimensions</Text>
            <Text style={[styles.presetValue, themeStyles.secondaryText]}>1080×1080</Text>
          </View>
          
          <View style={[styles.presetCard, themeStyles.card]}>
            <Text style={[styles.presetTitle, themeStyles.text]}>Default Format</Text>
            <Text style={[styles.presetValue, themeStyles.secondaryText]}>JPEG</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Privacy</Text>
          
          <View style={[styles.infoCard, themeStyles.card]}>
            <Text style={[styles.infoTitle, themeStyles.text]}>Local Processing</Text>
            <Text style={[styles.infoText, themeStyles.secondaryText]}>
              All image compression happens on your device. No images are uploaded to external servers.
            </Text>
          </View>
          
          <View style={[styles.infoCard, themeStyles.card]}>
            <Text style={[styles.infoTitle, themeStyles.text]}>Data Collection</Text>
            <Text style={[styles.infoText, themeStyles.secondaryText]}>
              We only collect anonymous usage statistics to improve the app. No personal data is collected.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, themeStyles.secondaryText]}>
            ImageSize Compress v1.0.0
          </Text>
          <Text style={[styles.footerText, themeStyles.secondaryText]}>
            Made with ❤️ for mobile photographers
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#00bcd4',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  settingValue: {
    fontSize: 14,
    marginRight: 8,
  },
  settingArrow: {
    fontSize: 16,
    color: '#cccccc',
  },
  presetCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  presetTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  presetValue: {
    fontSize: 14,
  },
  infoCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  text: {
    color: '#333333',
  },
  secondaryText: {
    color: '#666666',
  },
  card: {
    backgroundColor: '#f8f8f8',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#cccccc',
  },
  card: {
    backgroundColor: '#2a2a2a',
  },
});

export default SettingsScreen;