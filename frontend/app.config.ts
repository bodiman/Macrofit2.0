import { ExpoConfig } from "expo/config"

const config: ExpoConfig = {
    // "expo": {
    "name": "macrofit",
    "slug": "macrofit",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "macrofit",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.bodiman.macrofit"
    },
    "android": {
    "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
    },
    "package": "com.bodiman.macrofit"
    },
    "web": {
    "bundler": "metro",
    "output": "static",
    "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
    "expo-router",
    [
        "expo-splash-screen",
        {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
        }
    ]
    ],
    "experiments": {
    "typedRoutes": true
    },
    "extra": {
        "router": {
            "origin": false
        },
        "eas": {
            "projectId": "97579ad2-aa7e-4571-a57d-6b201f31c0f0"
        },
        "SERVER_ADDRESS": process.env.SERVER_ADDRESS || "http://localhost:5050",
        "CLERK_PUBLISHABLE_KEY": process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
}

export default config;
  