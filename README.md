# FASHN AI - Virtual Try-On Mobile App

<div align="center">
  <h3>🎨 AI-Powered Virtual Try-On Technology</h3>
  <p>Transform fashion retail with cutting-edge virtual fitting experiences</p>
</div>

---

## 🚀 Overview

FASHN AI is a revolutionary mobile application that leverages advanced artificial intelligence to provide seamless virtual try-on experiences. Users can upload photos of models and garments, and our custom AI model perfectly fits clothing items to create realistic virtual fittings.

### ✨ Key Features

- **📱 Intuitive Mobile Interface** - Clean, modern design optimized for mobile devices
- **🤖 AI-Powered Fitting** - Advanced machine learning for realistic garment fitting
- **📸 Photo Upload System** - Support for camera capture and photo library selection
- **👔 Multi-Category Support** - Tops, bottoms, and dresses with specialized fitting algorithms
- **⚡ Real-Time Processing** - Live progress tracking with detailed AI processing steps
- **🎯 Professional Results** - High-quality virtual try-on outputs with celebration animations
- **🔐 Authentication Flow** - Google and GitHub sign-in integration (demo ready)
- **🎭 Onboarding Experience** - Smooth user introduction to app capabilities

---

## 🛠 Tech Stack

### Frontend Framework
- **React Native** with Expo SDK
- **TypeScript** for type safety and developer experience
- **Expo Router** for navigation and deep linking

### UI & Animations
- **React Native Reanimated** for smooth, performant animations
- **Custom Component System** with themed styling
- **SF Symbols** with Material Icons fallback for cross-platform consistency

### State Management
- **React Hooks** for local state management
- **Context API** ready for global state (user auth, preferences)

### Development Tools
- **Expo CLI** for development and testing
- **TypeScript ESLint** for code quality
- **Metro Bundler** for fast refresh and hot reloading

---

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** installed globally
- **iOS Simulator** (Mac) or **Android Studio** (for device testing)

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/fashn-ai-mobile.git
cd fashn-ai-mobile
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start Development Server
```bash
npx expo start
```

### 4. Run on Device
- **iOS**: Press `i` in terminal or scan QR code with Camera app
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **Web**: Press `w` in terminal for web preview

---

## 📱 App Architecture

### Screen Flow
```
App Launch
    ↓
Onboarding (Feature Introduction)
    ↓
Sign-In (Google/GitHub/Skip)
    ↓
Studio (Main Interface)
    ↓
Results (AI Processing & Output)
```

### Directory Structure
```
app/
├── (tabs)/                 # Tab navigation screens
│   ├── index.tsx          # Studio (main interface)
│   └── account.tsx        # User account management
├── onboarding.tsx         # App introduction screen
├── signin.tsx             # Authentication flow
├── results.tsx            # AI processing & results
├── _layout.tsx            # Root navigation setup
└── index.tsx              # App entry point

components/
├── ui/
│   └── IconSymbol.tsx     # Cross-platform icon system
├── ThemedText.tsx         # Themed text component
└── ThemedView.tsx         # Themed container component

constants/
└── Colors.ts              # Brand color system (Gold primary)
```

---

## 🎨 Design System

### Brand Colors
- **Primary**: Gold (`#FFD700`) - Brand accent and active states
- **Text**: Black (`#000`) - High contrast on gold backgrounds
- **Background**: Light Gray (`#FAFAFA`) - Clean, modern backdrop
- **Secondary**: Gray (`#687076`) - Inactive states and subtle elements

### Typography
- **Title**: Bold, large text for headers and primary CTAs
- **Subtitle**: Medium weight for section headers
- **Body**: Regular weight for descriptions and labels
- **Captions**: Light weight for secondary information

### Border Radius
- **Reduced roundness** throughout for geometric, professional aesthetic
- **12px** for cards and containers
- **8px** for buttons and smaller elements

---

## 🔧 Key Components

### Studio Interface (`app/(tabs)/index.tsx`)
- **Photo Upload System**: Model and garment selection with live previews
- **Garment Type Selection**: Top, Bottom, Dress with visual icons
- **Generate Button**: Contextual state with proper contrast
- **Vertical Centering**: Responsive layout for all screen sizes

### Results Screen (`app/results.tsx`)
- **AI Progress Tracking**: 6-step simulation with realistic timing
- **Animated Results**: Spring-based scaling and opacity transitions
- **Action Buttons**: Save, Share, and New Project workflows
- **Professional Polish**: Shadows, spacing, and visual hierarchy

### Onboarding Flow
- **Feature Introduction**: Visual explanation of AI capabilities
- **Staggered Animations**: Professional entrance effects
- **Clear Value Proposition**: Excitement building for user engagement

---

## 🚀 Features in Detail

### Virtual Try-On Process

1. **Model Upload**
   - Camera capture or photo library selection
   - Image preview with proper aspect ratio (3:4)
   - Permission handling for camera and media access

2. **Garment Selection**
   - Multi-category support (Top, Bottom, Dress)
   - Visual type selection with SF Symbol icons
   - Image upload with same preview system

3. **AI Processing**
   - 6-step realistic progress simulation
   - Real-time step descriptions and progress bar
   - Input image reference during processing

4. **Results Display**
   - Large hero image with dramatic shadows
   - Celebration messaging ("Perfect Fit!")
   - Action buttons for save, share, and continue

### Authentication System
- **Demo-Ready**: Placeholder implementations for client presentations
- **Google Integration**: Ready for OAuth implementation
- **GitHub Integration**: Developer-focused authentication option
- **Skip Option**: Immediate access for testing and demos

---

## 🎯 Demo Usage

This app is designed as a **client demonstration** of FASHN AI's virtual try-on capabilities:

### For Client Presentations
1. **Onboarding**: Showcases the AI capability and value proposition
2. **Sign-In Flow**: Demonstrates professional authentication options
3. **Studio Interface**: Clean, intuitive design for virtual try-ons
4. **AI Processing**: Realistic simulation of backend AI processing
5. **Results**: Polished output with professional action options

### Customization Points
- **Brand Colors**: Easily customizable in `constants/Colors.ts`
- **AI Steps**: Modify processing steps in `results.tsx`
- **Authentication**: Replace demo alerts with real OAuth implementations
- **Backend Integration**: Add real API calls for AI processing

---

## 🔮 Future Roadmap

### Phase 1: Core Enhancements
- [ ] Real AI backend integration
- [ ] User account persistence
- [ ] Photo gallery and history
- [ ] Enhanced garment type support

### Phase 2: Advanced Features
- [ ] Social sharing capabilities
- [ ] Virtual wardrobe management
- [ ] Size and fit recommendations
- [ ] Multi-model support

### Phase 3: Enterprise Features
- [ ] Brand customization options
- [ ] Analytics dashboard
- [ ] Batch processing capabilities
- [ ] API integration for e-commerce platforms