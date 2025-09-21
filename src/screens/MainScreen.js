import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const MainScreen = ({ onNavigate, selectedImages, setSelectedImages, isDarkMode }) => {
  const [isSelecting, setIsSelecting] = useState(false);

  const selectImages = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 10,
      quality: 1,
      includeBase64: false,
    };

    setIsSelecting(true);
    launchImageLibrary(options, (response) => {
      setIsSelecting(false);
      if (response.assets) {
        setSelectedImages(response.assets);
      }
    });
  };

  const quickCompress = () => {
    if (selectedImages.length === 0) {
      selectImages();
      return;
    }
    onNavigate('compress');
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
  };

  const presets = [
    { name: 'Email', subtitle: '≤200KB', quality: 60, maxWidth: 1024 },
    { name: 'Instagram', subtitle: '≤1MB', quality: 80, maxWidth: 1080 },
    { name: 'Archive', subtitle: 'Lossless', quality: 95, maxWidth: null },
  ];

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <Text style={[styles.title, themeStyles.text]}>ImageSize Compress</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => onNavigate('settings')}
        >
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedImages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={[styles.emptyTitle, themeStyles.text]}>No images yet</Text>
            <Text style={[styles.emptySubtitle, themeStyles.secondaryText]}>
              Tap + to add photos
            </Text>
          </View>
        ) : (
          <View style={styles.imageGrid}>
            <Text style={[styles.sectionTitle, themeStyles.text]}>
              Selected Images ({selectedImages.length})
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedImages.map((image, index) => (
                <View key={index} style={styles.imageCard}>
                  <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.removeText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.presetsSection}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Quick Presets</Text>
          {presets.map((preset, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.presetCard, themeStyles.card]}
              onPress={() => {
                // Set preset and navigate to compress
                onNavigate('compress');
              }}
            >
              <View style={styles.presetContent}>
                <Text style={[styles.presetName, themeStyles.text]}>{preset.name}</Text>
                <Text style={[styles.presetSubtitle, themeStyles.secondaryText]}>
                  {preset.subtitle}
                </Text>
              </View>
              <Text style={styles.presetArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.customButton, themeStyles.card]}
          onPress={() => onNavigate('compress')}
        >
          <Text style={[styles.customButtonText, themeStyles.text]}>Custom Compress</Text>
          <Text style={[styles.customButtonSubtitle, themeStyles.secondaryText]}>
            Quality slider, target size, dimensions
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={selectImages}
          disabled={isSelecting}
        >
          <Text style={styles.addButtonText}>
            {isSelecting ? 'Selecting...' : '+ Add Photos'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.compressButton,
            selectedImages.length === 0 && styles.compressButtonDisabled
          ]}
          onPress={quickCompress}
          disabled={selectedImages.length === 0}
        >
          <Text style={styles.compressButtonText}>
            {selectedImages.length === 0 ? 'Select Images First' : 'Compress Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 8,
  },
  settingsIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  imageGrid: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  imageCard: {
    marginRight: 12,
    position: 'relative',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  presetsSection: {
    marginVertical: 20,
  },
  presetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  presetContent: {
    flex: 1,
  },
  presetName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  presetSubtitle: {
    fontSize: 12,
  },
  presetArrow: {
    fontSize: 16,
    color: '#00bcd4',
  },
  customButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  customButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  customButtonSubtitle: {
    fontSize: 12,
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  addButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  compressButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  compressButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  compressButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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

export default MainScreen;