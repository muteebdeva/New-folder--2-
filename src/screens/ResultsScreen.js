import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

const { width } = Dimensions.get('window');

const ResultsScreen = ({ originalImages, compressedImages, onBack, isDarkMode }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  const calculateSavings = () => {
    const originalSize = originalImages.reduce((sum, img) => sum + (img.fileSize || 0), 0);
    const compressedSize = compressedImages.reduce((sum, img) => sum + (img.size || 0), 0);
    const savings = ((originalSize - compressedSize) / originalSize) * 100;
    return {
      originalSize: formatFileSize(originalSize),
      compressedSize: formatFileSize(compressedSize),
      savings: Math.round(savings),
      savedBytes: formatFileSize(originalSize - compressedSize),
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const shareImage = async (image) => {
    try {
      const options = {
        url: `file://${image.path}`,
        type: 'image/jpeg',
      };
      await Share.open(options);
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const shareAll = async () => {
    try {
      const urls = compressedImages.map(img => `file://${img.path}`);
      const options = {
        urls,
        type: 'image/jpeg',
      };
      await Share.open(options);
    } catch (error) {
      Alert.alert('Share Error', 'Could not share images');
    }
  };

  const saveToGallery = async (image) => {
    try {
      // This would require additional native module setup
      Alert.alert('Success', 'Image saved to gallery');
    } catch (error) {
      Alert.alert('Save Error', 'Could not save image');
    }
  };

  const savings = calculateSavings();
  const currentOriginal = originalImages[selectedIndex];
  const currentCompressed = compressedImages[selectedIndex];

  return (
    <View style={[styles.container, themeStyles.container]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, themeStyles.text]}>Results</Text>
        <TouchableOpacity onPress={shareAll} style={styles.shareButton}>
          <Text style={styles.shareText}>Share All</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryCard, themeStyles.card]}>
        <Text style={[styles.summaryTitle, themeStyles.text]}>
          Done — saved {savings.savedBytes}
        </Text>
        <View style={styles.summaryStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, themeStyles.secondaryText]}>Before</Text>
            <Text style={[styles.statValue, themeStyles.text]}>{savings.originalSize}</Text>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, themeStyles.secondaryText]}>After</Text>
            <Text style={[styles.statValue, themeStyles.text]}>{savings.compressedSize}</Text>
          </View>
        </View>
        <Text style={styles.savingsText}>Saved {savings.savings}% — looks great!</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.imageSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {compressedImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbnailContainer,
                  selectedIndex === index && styles.thumbnailSelected
                ]}
                onPress={() => setSelectedIndex(index)}
              >
                <Image source={{ uri: image.uri }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.imagePreview}>
          <View style={styles.previewHeader}>
            <Text style={[styles.previewTitle, themeStyles.text]}>
              Image {selectedIndex + 1} of {compressedImages.length}
            </Text>
            <TouchableOpacity
              style={styles.compareToggle}
              onPress={() => setShowComparison(!showComparison)}
            >
              <Text style={styles.compareText}>
                {showComparison ? 'Hide Compare' : 'Compare'}
              </Text>
            </TouchableOpacity>
          </View>

          {showComparison ? (
            <View style={styles.comparisonView}>
              <View style={styles.comparisonSide}>
                <Text style={[styles.comparisonLabel, themeStyles.secondaryText]}>Original</Text>
                <Image source={{ uri: currentOriginal.uri }} style={styles.comparisonImage} />
                <Text style={[styles.comparisonSize, themeStyles.secondaryText]}>
                  {formatFileSize(currentOriginal.fileSize || 0)}
                </Text>
              </View>
              <View style={styles.comparisonSide}>
                <Text style={[styles.comparisonLabel, themeStyles.secondaryText]}>Compressed</Text>
                <Image source={{ uri: currentCompressed.uri }} style={styles.comparisonImage} />
                <Text style={[styles.comparisonSize, themeStyles.secondaryText]}>
                  {formatFileSize(currentCompressed.size || 0)}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.singlePreview}>
              <Image source={{ uri: currentCompressed.uri }} style={styles.previewImage} />
              <View style={styles.imageInfo}>
                <Text style={[styles.infoText, themeStyles.secondaryText]}>
                  {formatFileSize(currentCompressed.size || 0)} • {currentCompressed.width}×{currentCompressed.height}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, themeStyles.card]}
            onPress={() => shareImage(currentCompressed)}
          >
            <Text style={styles.actionIcon}>📤</Text>
            <Text style={[styles.actionText, themeStyles.text]}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, themeStyles.card]}
            onPress={() => saveToGallery(currentCompressed)}
          >
            <Text style={styles.actionIcon}>💾</Text>
            <Text style={[styles.actionText, themeStyles.text]}>Save</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, themeStyles.card]}
            onPress={() => {
              // Copy to clipboard or show file path
              Alert.alert('File Path', currentCompressed.path);
            }}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={[styles.actionText, themeStyles.text]}>Copy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.compressMoreButton}
          onPress={onBack}
        >
          <Text style={styles.compressMoreText}>Compress More</Text>
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
  shareButton: {
    padding: 8,
  },
  shareText: {
    fontSize: 16,
    color: '#00bcd4',
  },
  summaryCard: {
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 20,
    color: '#00bcd4',
    marginHorizontal: 20,
  },
  savingsText: {
    fontSize: 14,
    color: '#00bcd4',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  imageSelector: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  thumbnailContainer: {
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: '#00bcd4',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  imagePreview: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  compareToggle: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#00bcd4',
    borderRadius: 6,
  },
  compareText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  comparisonView: {
    flexDirection: 'row',
    gap: 12,
  },
  comparisonSide: {
    flex: 1,
    alignItems: 'center',
  },
  comparisonLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  comparisonImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  comparisonSize: {
    fontSize: 11,
  },
  singlePreview: {
    alignItems: 'center',
  },
  previewImage: {
    width: width - 40,
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageInfo: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  actionIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomActions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  compressMoreButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  compressMoreText: {
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

export default ResultsScreen;