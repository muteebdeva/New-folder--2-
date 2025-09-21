import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.appIcon}>
            <Text style={styles.iconText}>📸</Text>
            <Text style={styles.boltText}>⚡</Text>
          </View>
        </View>
        
        <Text style={styles.title}>ImageSize Compress</Text>
        <Text style={styles.subtitle}>Reduce photo file size with minimal quality loss</Text>
        
        <View style={styles.demoContainer}>
          <View style={styles.beforeAfter}>
            <View style={styles.demoCard}>
              <Text style={styles.demoLabel}>Before</Text>
              <Text style={styles.demoSize}>4.2 MB</Text>
            </View>
            <Text style={styles.arrow}>→</Text>
            <View style={styles.demoCard}>
              <Text style={styles.demoLabel}>After</Text>
              <Text style={styles.demoSize}>1.1 MB</Text>
            </View>
          </View>
          <Text style={styles.savings}>Saved 72% — looks great!</Text>
        </View>
        
        <View style={styles.features}>
          <Text style={styles.feature}>• One-tap compression</Text>
          <Text style={styles.feature}>• Batch processing</Text>
          <Text style={styles.feature}>• Multiple formats (JPEG, PNG, WebP)</Text>
          <Text style={styles.feature}>• Compare before & after</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.getStartedButton} onPress={onComplete}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      
      <Text style={styles.freeText}>Compress smarter — free plan available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  appIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#00bcd4',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconText: {
    fontSize: 32,
  },
  boltText: {
    fontSize: 16,
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  demoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  beforeAfter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  demoCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 80,
  },
  demoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  demoSize: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  arrow: {
    fontSize: 20,
    color: '#00bcd4',
    marginHorizontal: 16,
  },
  savings: {
    fontSize: 14,
    color: '#00bcd4',
    fontWeight: '600',
  },
  features: {
    alignItems: 'flex-start',
  },
  feature: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  freeText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default OnboardingScreen;