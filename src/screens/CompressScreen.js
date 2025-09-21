import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Slider from 'react-native-slider';
import { compressImage } from '../utils/imageCompressor';

const CompressScreen = ({ images, onComplete, onBack, isDarkMode }) => {
  const [quality, setQuality] = useState(80);
  const [targetSize, setTargetSize] = useState('');
  const [maxWidth, setMaxWidth] = useState('1080');
  const [maxHeight, setMaxHeight] = useState('1080');
  const [format, setFormat] = useState('JPEG');
  const [preserveAspect, setPreserveAspect] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const formats = ['JPEG', 'PNG', 'WebP'];
  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const startCompression = async () => {
    if (images.length === 0) {
      Alert.alert('No Images', 'Please select images to compress');
      return;
    }

    setIsCompressing(true);
    setProgress(0);

    try {
      const compressedImages = [];
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        setProgress((i / images.length) * 100);
        
        const compressedImage = await compressImage(image, {
          quality: quality / 100,
          maxWidth: maxWidth ? parseInt(maxWidth) : undefined,
          maxHeight: maxHeight ? parseInt(maxHeight) : undefined,
          format: format.toLowerCase(),
          targetSize: targetSize ? parseInt(targetSize) * 1024 : undefined, // Convert KB to bytes
        });
        
        compressedImages.push(compressedImage);
      }
      
      setProgress(100);
      setTimeout(() => {
        onComplete(compressedImages);
      }, 500);
      
    } catch (error) {
      Alert.alert('Compression Failed', 'Try lowering quality or check image format');
      setIsCompressing(false);
    }
  };

  const getEstimatedSize = () => {
    if (images.length === 0) return '0 KB';
    const avgOriginalSize = images.reduce((sum, img) => sum + (img.fileSize || 0), 0) / images.length;
    const estimatedSize = (avgOriginalSize * (quality / 100)) / 1024;
    return `~${Math.round(estimatedSize)} KB each`;
  };

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, themeStyles.text]}>Custom Compress</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>
            Quality: {quality}%
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={100}
            value={quality}
            onValueChange={setQuality}
            step={5}
            minimumTrackTintColor="#00bcd4"
            maximumTrackTintColor="#e0e0e0"
            thumbStyle={styles.sliderThumb}
          />
          <View style={styles.sliderLabels}>
            <Text style={[styles.sliderLabel, themeStyles.secondaryText]}>Smaller</Text>
            <Text style={[styles.sliderLabel, themeStyles.secondaryText]}>Better Quality</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Format</Text>
          <View style={styles.formatButtons}>
            {formats.map((fmt) => (
              <TouchableOpacity
                key={fmt}
                style={[
                  styles.formatButton,
                  themeStyles.card,
                  format === fmt && styles.formatButtonActive
                ]}
                onPress={() => setFormat(fmt)}
              >
                <Text style={[
                  styles.formatButtonText,
                  themeStyles.text,
                  format === fmt && styles.formatButtonTextActive
                ]}>
                  {fmt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Dimensions</Text>
          <View style={styles.dimensionInputs}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, themeStyles.secondaryText]}>Max Width</Text>
              <TouchableOpacity style={[styles.input, themeStyles.card]}>
                <Text style={[styles.inputText, themeStyles.text]}>{maxWidth || 'Auto'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, themeStyles.secondaryText]}>Max Height</Text>
              <TouchableOpacity style={[styles.input, themeStyles.card]}>
                <Text style={[styles.inputText, themeStyles.text]}>{maxHeight || 'Auto'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.aspectToggle}
            onPress={() => setPreserveAspect(!preserveAspect)}
          >
            <View style={[
              styles.checkbox,
              preserveAspect && styles.checkboxActive
            ]}>
              {preserveAspect && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.aspectText, themeStyles.text]}>Preserve aspect ratio</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, themeStyles.text]}>Target Size (Optional)</Text>
          <TouchableOpacity style={[styles.input, themeStyles.card]}>
            <Text style={[styles.inputText, themeStyles.text]}>
              {targetSize ? `${targetSize} KB` : 'No limit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.estimateCard, themeStyles.card]}>
          <Text style={[styles.estimateTitle, themeStyles.text]}>Estimated Size</Text>
          <Text style={[styles.estimateSize, themeStyles.secondaryText]}>{getEstimatedSize()}</Text>
          <Text style={[styles.estimateCount, themeStyles.secondaryText]}>
            {images.length} image{images.length !== 1 ? 's' : ''} selected
          </Text>
        </View>
      </ScrollView>

      {isCompressing && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={[styles.progressText, themeStyles.text]}>
            Compressing... {Math.round(progress)}%
          </Text>
        </View>
      )}

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[
            styles.compressButton,
            isCompressing && styles.compressButtonDisabled
          ]}
          onPress={startCompression}
          disabled={isCompressing}
        >
          <Text style={styles.compressButtonText}>
            {isCompressing ? 'Compressing...' : 'Start Compression'}
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
  slider: {
    height: 40,
    marginVertical: 8,
  },
  sliderThumb: {
    backgroundColor: '#00bcd4',
    width: 20,
    height: 20,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 12,
  },
  formatButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  formatButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  formatButtonActive: {
    backgroundColor: '#00bcd4',
  },
  formatButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  formatButtonTextActive: {
    color: '#ffffff',
  },
  dimensionInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inputText: {
    fontSize: 14,
  },
  aspectToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#00bcd4',
    borderColor: '#00bcd4',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  aspectText: {
    fontSize: 14,
  },
  estimateCard: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
  },
  estimateTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  estimateSize: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  estimateCount: {
    fontSize: 12,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00bcd4',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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

export default CompressScreen;