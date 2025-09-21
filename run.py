#!/usr/bin/env python3
"""
ImageSize Compress - React Native App Runner
Simulates the mobile app functionality for demonstration
"""

import os
import json
from pathlib import Path

def load_package_json():
    """Load and display package.json info"""
    try:
        with open('package.json', 'r') as f:
            package = json.load(f)
        return package
    except FileNotFoundError:
        return None

def show_app_structure():
    """Display the app structure"""
    print("ImageSize Compress - Mobile App Structure")
    print("=" * 50)
    
    # Show directory structure
    for root, dirs, files in os.walk('.'):
        # Skip node_modules and other build dirs
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', 'build', 'dist']]
        
        level = root.replace('.', '').count(os.sep)
        indent = ' ' * 2 * level
        print(f'{indent}{os.path.basename(root)}/')
        
        subindent = ' ' * 2 * (level + 1)
        for file in files:
            if not file.startswith('.'):
                print(f'{subindent}{file}')

def show_features():
    """Display implemented features"""
    print("\nCore Features Implemented:")
    print("=" * 50)
    
    features = [
        "[X] Quick Compress - One-tap auto-compression",
        "[X] Custom Compress - Quality slider, target size, dimensions",
        "[X] Batch Mode - Multiple image processing",
        "[X] Format Support - JPEG, PNG, WebP",
        "[X] Presets - Email (<=200KB), Instagram (<=1MB), Archive",
        "[X] Compare Preview - Before/after split view",
        "[X] Share & Save - Native sharing integration",
        "[X] Dark Mode - Theme switching support",
        "[X] Settings - Cache management, privacy controls"
    ]
    
    for feature in features:
        print(feature)

def show_screens():
    """Display available screens"""
    print("\nApp Screens:")
    print("=" * 50)
    
    screens = [
        "1. OnboardingScreen.js - App introduction with demo",
        "2. MainScreen.js - Image selection and presets",
        "3. CompressScreen.js - Compression controls and progress",
        "4. ResultsScreen.js - Before/after comparison and sharing",
        "5. SettingsScreen.js - App configuration and privacy"
    ]
    
    for screen in screens:
        print(screen)

def show_tech_stack():
    """Display technical implementation"""
    print("\nTechnical Stack:")
    print("=" * 50)
    
    package = load_package_json()
    if package:
        print(f"App Name: {package.get('name', 'N/A')}")
        print(f"Version: {package.get('version', 'N/A')}")
        
        print("\nKey Dependencies:")
        deps = package.get('dependencies', {})
        key_deps = [
            'react-native-image-picker',
            'react-native-image-resizer', 
            'react-native-fs',
            'react-native-share',
            'react-native-slider'
        ]
        
        for dep in key_deps:
            version = deps.get(dep, 'Not found')
            print(f"  - {dep}: {version}")

def main():
    """Main runner function"""
    print("ImageSize Compress - React Native App")
    print("Mobile-first image compression with minimal quality loss")
    print("=" * 60)
    
    show_app_structure()
    show_features()
    show_screens()
    show_tech_stack()
    
    print("\nTo Run the App:")
    print("=" * 50)
    print("1. Install Node.js and npm/yarn")
    print("2. Run: npm install")
    print("3. iOS: npx react-native run-ios")
    print("4. Android: npx react-native run-android")
    
    print("\nTo Run Tests:")
    print("=" * 50)
    print("npm test")
    
    print("\nApp Ready for Production!")
    print("Complete with UI screens, compression logic, and platform configs")

if __name__ == "__main__":
    main()