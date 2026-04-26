# Rung Chuong — Implementation Plan

## Overview
**Rung Chuong** (Ring the Bell) is a fun single-screen mobile + web app.
User taps a large bell icon → phone vibrates + bell rings with sound + bell shakes with animation.
No cooldown. No network. Pure client-side.

## Project Structure
```
rungchuong/
├── apps/
│   ├── mobile/           # Expo React Native (iOS + Android)
│   └── web/              # Vanilla HTML/CSS/JS SPA
├── assets/
│   └── bell.mp3          # Placeholder bell sound
├── IMPLEMENTATION_PLAN.md
└── README.md
```

## Tech Stack

| Layer | Mobile | Web |
|-------|--------|-----|
| Framework | Expo SDK 52 + React Native | Vanilla HTML/CSS/JS |
| Audio | expo-av | Web Audio API / HTML5Audio |
| Animation | RN Animated API | CSS keyframe transforms |
| Haptics | expo-haptics | navigator.vibrate (if supported) |
| Deploy | EAS Build → App Store / Play Store | Vercel / Netlify |

## Core Feature: Tap-to-Ring

User taps bell → Three things happen simultaneously:
1. **Audio**: Play `bell.mp3` from start (restart if already playing)
2. **Animation**: Bell shakes side-to-side + grows slightly + glow effect
3. **Haptics**: Phone vibrates (mobile only)

No cooldown — taps can be as fast as the user can press.
No network requests — everything runs locally.

## Design System

- **Background**: Dark (#0a0a0a to #1a1a2e gradient)
- **Bell**: Large centered icon, white/cream color
- **Active state**: Neon gold glow (#ffd700), shake animation, scale pulse
- **Typo**: Bold, uppercase, centered "RUNG CHUONG" title

## Milestones

| # | Task | Estimated |
|---|------|-----------|
| 1 | Plan & scaffold both apps | ✅ |
| 2 | Mobile: Bell component + audio + animation | Day 1 |
| 3 | Web: Bell component + audio + animation | Day 1 |
| 4 | Asset placeholders (bell.mp3, splash, icon) | Day 2 |
| 5 | App Store / Google Play submission | Day 2-3 |

## Store Submission Checklist

### iOS (App Store)
- [ ] Apple Developer Account ($99/yr)
- [ ] App ID in Certificates, Identifiers & Profiles
- [ ] EAS Build configured with `eas build --platform ios`
- [ ] App Store Connect entry
- [ ] Screenshots (6.5" + 5.5" required)
- [ ] Privacy policy URL
- [ ] TestFlight testing

### Android (Google Play)
- [ ] Google Play Developer Account ($25 one-time)
- [ ] EAS Build configured with `eas build --platform android`
- [ ] Signed AAB via EAS
- [ ] Play Console listing
- [ ] Screenshots + feature graphic
- [ ] Privacy policy URL

## Future Ideas
- Different bell sounds (user selectable)
- Leaderboard: number of rings globally
- Share a "ring" to friends
- Custom bell skins
- Soundboard mode with multiple sounds