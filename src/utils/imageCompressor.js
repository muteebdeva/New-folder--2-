import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

export const compressImage = async (image, options = {}) => {
  try {
    const {
      quality = 0.8,
      maxWidth = 1080,
      maxHeight = 1080,
      format = 'jpeg',
      targetSize = null,
    } = options;

    // Initial compression
    let compressedImage = await ImageResizer.createResizedImage(
      image.uri,
      maxWidth,
      maxHeight,
      format.toUpperCase(),
      Math.round(quality * 100),
      0, // rotation
      undefined, // outputPath
      false, // keepMeta
      {
        mode: 'contain',
        onlyScaleDown: true,
      }
    );

    // If target size is specified, iteratively compress until we reach it
    if (targetSize) {
      let currentQuality = quality;
      let attempts = 0;
      const maxAttempts = 5;

      while (attempts < maxAttempts) {
        const stats = await RNFS.stat(compressedImage.path);
        
        if (stats.size <= targetSize) {
          break;
        }

        // Reduce quality for next attempt
        currentQuality = Math.max(0.1, currentQuality - 0.15);
        
        compressedImage = await ImageResizer.createResizedImage(
          image.uri,
          maxWidth,
          maxHeight,
          format.toUpperCase(),
          Math.round(currentQuality * 100),
          0,
          undefined,
          false,
          {
            mode: 'contain',
            onlyScaleDown: true,
          }
        );

        attempts++;
      }
    }

    // Get file stats
    const stats = await RNFS.stat(compressedImage.path);

    return {
      ...compressedImage,
      size: stats.size,
      originalSize: image.fileSize || 0,
      compressionRatio: image.fileSize ? (1 - stats.size / image.fileSize) : 0,
    };

  } catch (error) {
    console.error('Compression error:', error);
    throw new Error('Failed to compress image');
  }
};

export const batchCompressImages = async (images, options = {}, onProgress = null) => {
  const compressedImages = [];
  
  for (let i = 0; i < images.length; i++) {
    try {
      if (onProgress) {
        onProgress((i / images.length) * 100);
      }
      
      const compressed = await compressImage(images[i], options);
      compressedImages.push(compressed);
      
    } catch (error) {
      console.error(`Failed to compress image ${i}:`, error);
      // Continue with other images even if one fails
      compressedImages.push({
        ...images[i],
        error: 'Compression failed',
      });
    }
  }
  
  if (onProgress) {
    onProgress(100);
  }
  
  return compressedImages;
};

export const getCompressionPresets = () => {
  return {
    email: {
      quality: 0.6,
      maxWidth: 1024,
      maxHeight: 1024,
      targetSize: 200 * 1024, // 200KB
      format: 'jpeg',
    },
    instagram: {
      quality: 0.8,
      maxWidth: 1080,
      maxHeight: 1080,
      targetSize: 1024 * 1024, // 1MB
      format: 'jpeg',
    },
    archive: {
      quality: 0.95,
      maxWidth: null,
      maxHeight: null,
      targetSize: null,
      format: 'jpeg',
    },
    web: {
      quality: 0.75,
      maxWidth: 1920,
      maxHeight: 1080,
      targetSize: null,
      format: 'jpeg',
    },
  };
};

export const estimateCompressedSize = (originalSize, quality) => {
  // Rough estimation based on quality setting
  const compressionFactor = Math.pow(quality, 1.5);
  return Math.round(originalSize * compressionFactor);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const calculateSavings = (originalSize, compressedSize) => {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
};