import {
  compressImage,
  batchCompressImages,
  getCompressionPresets,
  estimateCompressedSize,
  formatFileSize,
  calculateSavings,
} from '../src/utils/imageCompressor';

// Mock react-native-image-resizer
jest.mock('react-native-image-resizer', () => ({
  createResizedImage: jest.fn(() =>
    Promise.resolve({
      uri: 'file://compressed-image.jpg',
      path: '/path/to/compressed-image.jpg',
      width: 1080,
      height: 1080,
    })
  ),
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  stat: jest.fn(() =>
    Promise.resolve({
      size: 500000, // 500KB
    })
  ),
}));

describe('Image Compressor Utils', () => {
  const mockImage = {
    uri: 'file://test-image.jpg',
    fileSize: 2000000, // 2MB
    width: 2000,
    height: 2000,
  };

  describe('compressImage', () => {
    it('should compress image with default options', async () => {
      const result = await compressImage(mockImage);
      
      expect(result).toHaveProperty('uri');
      expect(result).toHaveProperty('size');
      expect(result).toHaveProperty('compressionRatio');
      expect(result.size).toBeLessThan(mockImage.fileSize);
    });

    it('should compress image with custom quality', async () => {
      const result = await compressImage(mockImage, { quality: 0.5 });
      
      expect(result).toHaveProperty('uri');
      expect(result.size).toBeLessThan(mockImage.fileSize);
    });

    it('should handle compression errors', async () => {
      const ImageResizer = require('react-native-image-resizer');
      ImageResizer.createResizedImage.mockRejectedValueOnce(new Error('Compression failed'));
      
      await expect(compressImage(mockImage)).rejects.toThrow('Failed to compress image');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 B');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1048576)).toBe('1 MB');
      expect(formatFileSize(1073741824)).toBe('1 GB');
    });

    it('should handle decimal places', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(2621440)).toBe('2.5 MB');
    });
  });

  describe('calculateSavings', () => {
    it('should calculate savings percentage', () => {
      const originalSize = 1000000;
      const compressedSize = 300000;
      
      const savings = calculateSavings(originalSize, compressedSize);
      
      expect(savings).toBe(70);
    });

    it('should handle zero original size', () => {
      const savings = calculateSavings(0, 100000);
      expect(savings).toBe(0);
    });
  });
});