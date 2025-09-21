# ImageSize Compress

A clean, fast, mobile-first image compression app that reduces photo file size with minimal quality loss.

## Features

- **Quick Compress** - One-tap auto-compression using perceptual quality algorithm
- **Custom Compress** - Quality slider (1-100%), target filesize, dimensions control
- **Batch Mode** - Select multiple images and compress in background
- **Format Support** - JPEG, PNG, WebP, AVIF (if supported)
- **Presets** - Email (≤200KB), Instagram (≤1MB), Archive (lossless)
- **Compare Preview** - Split view to compare original vs compressed
- **Share & Save** - Quick share sheet, save to album, export to cloud

## Target Audience

- Casual phone photographers
- Social media creators  
- Small business owners sending images over chat/email
- Developers who need compressed assets

## Installation

```bash
# Install dependencies
npm install

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## Project Structure

```
src/
├── screens/
│   ├── OnboardingScreen.js    # App introduction
│   ├── MainScreen.js          # Image selection & presets
│   ├── CompressScreen.js      # Compression controls
│   ├── ResultsScreen.js       # Before/after comparison
│   └── SettingsScreen.js      # App settings
├── utils/
│   └── imageCompressor.js     # Core compression logic
└── assets/                    # Images and icons
```

## Key Dependencies

- `react-native-image-picker` - Image selection
- `react-native-image-resizer` - Image compression
- `react-native-fs` - File system operations
- `react-native-share` - Sharing functionality
- `react-native-slider` - Quality control slider

## Technical Notes

- **Local Processing** - All compression happens on-device
- **Memory Efficient** - Stream-wise processing to avoid OOM
- **Performance** - Uses libjpeg-turbo/mozjpeg for fast JPEG compression
- **Privacy First** - No cloud uploads without explicit permission

## UI/UX Guidelines

- **Mobile-First** - Optimized for one-handed use
- **Clean Design** - Card-based layout with clear hierarchy
- **Quick Actions** - Primary workflow in 1-2 taps
- **Visual Feedback** - Progress bars and live size savings
- **Accessibility** - Large buttons, dark mode support

## Color Palette

- Primary: Teal (#00bcd4)
- Background: White/Dark (#ffffff/#1a1a1a)
- Text: Dark Gray/White (#333333/#ffffff)
- Secondary: Light Gray (#666666/#cccccc)

## Monetization

- **Freemium Model** - Free basic compression + daily batch limit
- **Pro Features** - Unlimited batches, AVIF support, cloud export, batch rename

## Performance Benchmarks

- Compress 12MP image: <3 seconds
- Batch process 10 images: <15 seconds
- Memory usage: <100MB peak

## License

MIT License - See LICENSE file for details