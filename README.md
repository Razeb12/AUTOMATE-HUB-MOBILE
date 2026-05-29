# Automat Hub Mobile

This is the mobile companion app for the **Automat OBD-II Live Data Pipeline**, built with React Native and Expo. It securely connects to the backend to stream and beautifully visualize real-time vehicle telemetry data (RPM, Speed, Coolant Temp) over WebSockets.

## 🚀 Getting Started

### 1. Environment Setup

Before running the application, you must configure your environment variables so the app knows how to communicate with the backend. 

Copy the example environment file:
```bash
cp .env.example .env
```

Ensure `.env` contains the correct URLs pointing to your backend (use your local IP address if testing on a physical device, or `127.0.0.1` if using an iOS simulator):
```env
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000
EXPO_PUBLIC_WS_URL=ws://127.0.0.1:8000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

Start the Expo Metro Bundler. We recommend using the `-c` flag to clear the cache and ensure your `.env` variables are correctly injected.

```bash
npx expo start -c
```

Once the bundler starts, press `i` to open the iOS simulator, `a` for Android, or scan the QR code using the **Expo Go** app on your physical device.

---

## 🏗️ Project Structure

We follow a **Feature-Sliced "Screaming" Architecture** to keep concerns strictly separated and maintainable.

```text
automat-mobile/
├── App.tsx                     # App entry point & global providers
├── .env                        # Local environment variables
└── src/
    ├── navigation/             # Core routing and navigators
    │   └── AppNavigator.tsx    
    │
    ├── auth/                   # Authentication Domain
    │   ├── guards/             # Route protection logic
    │   ├── hooks/              # Login API requests
    │   ├── screens/            # Login UI
    │   └── services/           # Secure token storage (expo-secure-store)
    │
    ├── telemetry/              # Telemetry & Dashboard Domain
    │   ├── components/         # Gauges, Banners, Pulse indicators
    │   ├── hooks/              # Frame throttling & WebSocket bridging
    │   ├── screens/            # Main Dashboard UI
    │   └── store/              # Global Zustand state for real-time data
    │
    ├── websocket/              # Infrastructure Layer
    │   ├── OBDWebSocketService # Core WS client managing connections
    │   ├── AppStateWatcher     # Reacts to app foreground/background
    │   └── ReconnectStrategy   # Exponential backoff algorithm
    │
    └── shared/                 # Shared Utilities
```

---

## ✨ Features

- **Secure Authentication**: Validates the user's API Key against the backend, retrieves a JWT, and securely stores it in the device's native Keychain/SecureStore.
- **Robust WebSockets**: Implements an aggressive WebSocket manager that handles graceful disconnects, AppState changes (backgrounding), and automatic reconnections using an Exponential Backoff strategy.
- **High-Performance Rendering**: Utilizes `useFrameThrottle` to throttle incoming 60Hz high-frequency WebSocket frames down to 16ms render intervals to prevent React Native bridge congestion.
- **State Management**: Uses `zustand` to cleanly share telemetry state across decoupled Dashboard components.
- **Dynamic Gauges**: Implements custom SVG animations for Speed, RPM, and Coolant Temperature gauges, changing colors smoothly as thresholds (Warn/Critical) are crossed.
