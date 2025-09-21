# Design Assets for ImageSize Compress

## App Icon Requirements

### Primary App Icon (1024×1024)
- **Style**: Flat, minimal design
- **Elements**: Photo/image symbol + lightning bolt or compression gauge
- **Colors**: Teal (#00bcd4) primary, white/gray accents
- **Format**: PNG with transparency
- **Usage**: App Store, home screen

### Icon Variations Needed
- 20×20, 29×29, 40×40, 58×58, 60×60, 76×76, 80×80, 87×87, 120×120, 152×152, 167×167, 180×180 (iOS)
- 48×48, 72×72, 96×96, 144×144, 192×192 (Android)

## Hero Thumbnail (1280×720)
- **Purpose**: Landing page, marketing materials
- **Content**: App interface mockup showing before/after compression
- **Style**: Clean, modern, mobile-first design
- **Text Overlay**: "Compress smarter — free plan available"

## App Store Screenshots (1242×2688 vertical)

### Screenshot 1: Pick & Compress
- **Scene**: Main screen with image selection
- **Elements**: 
  - Selected photos thumbnails
  - "Compress Now" button prominent
  - Quick presets visible (Email, Instagram, Archive)
- **Annotations**: "Select multiple photos" callout

### Screenshot 2: Compare Slider
- **Scene**: Results screen with before/after comparison
- **Elements**:
  - Split-screen comparison view
  - File size reduction stats (e.g., "4.2 MB → 1.1 MB")
  - "Saved 72% — looks great!" message
- **Annotations**: "Compare original vs compressed" callout

### Screenshot 3: Batch Results
- **Scene**: Batch compression results
- **Elements**:
  - Multiple compressed images grid
  - Total savings summary
  - Share/Save action buttons
- **Annotations**: "Process multiple images at once" callout

## UI Icons (24×24, 32×32)
- **Compress**: ⚡ Lightning bolt
- **Settings**: ⚙️ Gear
- **Share**: 📤 Upload arrow
- **Save**: 💾 Disk
- **Compare**: 👁️ Eye
- **Add**: ➕ Plus
- **Remove**: ❌ X mark
- **Back**: ← Left arrow

## Color Palette

### Primary Colors
- **Teal**: #00bcd4 (buttons, accents, progress)
- **White**: #ffffff (light mode background)
- **Dark**: #1a1a1a (dark mode background)

### Text Colors
- **Primary Text**: #333333 (light) / #ffffff (dark)
- **Secondary Text**: #666666 (light) / #cccccc (dark)
- **Disabled**: #999999 (light) / #666666 (dark)

### Status Colors
- **Success**: #4caf50 (green)
- **Error**: #f44336 (red)
- **Warning**: #ff9800 (orange)

## Typography

### Font Stack
- **iOS**: SF Pro Display, SF Pro Text
- **Android**: Roboto, sans-serif
- **Web**: Inter, system-ui, sans-serif

### Font Sizes
- **Large Title**: 28px (onboarding)
- **Title**: 20px (screen headers)
- **Headline**: 18px (section titles)
- **Body**: 16px (primary text)
- **Caption**: 14px (secondary text)
- **Small**: 12px (labels, metadata)

## Microcopy Examples

### Success Messages
- "Done — saved 1.2 MB"
- "Saved 72% — looks great!"
- "Compression complete"
- "Images ready to share"

### Error Messages
- "Compression failed — try lowering quality"
- "Could not access photo library"
- "File too large to process"
- "Network error — try again"

### Empty States
- "No images yet — tap + to add photos"
- "Select images to get started"
- "Your compressed images will appear here"

### Loading States
- "Selecting images..."
- "Compressing... 45%"
- "Processing batch..."
- "Saving to gallery..."

## Animation Guidelines

### Transitions
- **Duration**: 200-300ms
- **Easing**: ease-out for entrances, ease-in for exits
- **Type**: Slide, fade, scale (subtle)

### Progress Indicators
- **Compression**: Animated progress bar with percentage
- **Loading**: Subtle pulse or spinner
- **Success**: Brief checkmark animation

### Micro-interactions
- **Button Press**: Scale down 0.95x
- **Image Selection**: Border highlight + scale
- **Slider**: Smooth value updates
- **Toggle**: Smooth state transition

## Accessibility

### Touch Targets
- **Minimum Size**: 44×44px (iOS), 48×48px (Android)
- **Spacing**: 8px minimum between interactive elements
- **Visual Feedback**: Clear pressed/focused states

### Contrast Ratios
- **Normal Text**: 4.5:1 minimum
- **Large Text**: 3:1 minimum
- **Interactive Elements**: 3:1 minimum

### Screen Reader Support
- **Labels**: Descriptive text for all interactive elements
- **Hints**: Action descriptions ("Double tap to compress")
- **Status**: Live updates for compression progress

## Export Specifications

### File Formats
- **Icons**: PNG (transparency), SVG (vector)
- **Screenshots**: PNG (high quality)
- **Marketing**: JPG (web optimized)

### Naming Convention
- `icon_[size].png` (e.g., icon_1024.png)
- `screenshot_[number]_[description].png`
- `hero_thumbnail.jpg`
- `ui_icon_[name].svg`

### Delivery Structure
```
assets/
├── icons/
│   ├── app_icon_1024.png
│   ├── app_icon_180.png
│   └── ...
├── screenshots/
│   ├── screenshot_1_pick_compress.png
│   ├── screenshot_2_compare_slider.png
│   └── screenshot_3_batch_results.png
├── ui_icons/
│   ├── compress.svg
│   ├── settings.svg
│   └── ...
└── marketing/
    └── hero_thumbnail.jpg
```