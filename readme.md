# expo-plugin-fastlane

A simple Expo config plugin to automatically copy Fastlane configuration files into your iOS and/or Android project directories during the build process.

## ✨ Features

- 📦 Copies Fastlane files for iOS and Android during prebuild
- 🔄 Automatically places files in the correct platform directories
- ⚙️ Customizable source (`src`) and destination (`dest`) paths
- ✅ Optional platform configuration – only configure what you need

---

## 📦 Installation

```sh
npm install --save-dev expo-plugin-fastlane
# or
yarn add --dev expo-plugin-fastlane
```

---

## ⚙️ Usage

In your `app.json` or `app.config.js`:

```js
export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    plugins: [
      [
        "expo-plugin-fastlane",
        {
          ios: {
            src: "fastlane/ios", // required if ios is provided
            dest: "ios", // optional, defaults to "ios"
          },
          android: {
            src: "fastlane/android", // required if android is provided
            dest: "android", // optional, defaults to "android"
          },
        },
      ],
    ],
  },
};
```

---

## 📋 Plugin Options

| Key            | Type   | Required                 | Default     | Description                                                                |
| -------------- | ------ | ------------------------ | ----------- | -------------------------------------------------------------------------- |
| `ios.src`      | string | ✅ if `ios` provided     | —           | Path to your iOS Fastlane source directory (relative to project root).     |
| `ios.dest`     | string | ❌                       | `"ios"`     | Destination directory for iOS files.                                       |
| `android.src`  | string | ✅ if `android` provided | —           | Path to your Android Fastlane source directory (relative to project root). |
| `android.dest` | string | ❌                       | `"android"` | Destination directory for Android files.                                   |

> **Note:** Platform objects (`ios`, `android`) are optional — you can configure only one if needed.

---

## 📂 How it Works

- **`src` (required)** – Path to your Fastlane source directory (relative to your project root)
- **`dest` (optional)** – Destination directory for Fastlane files (defaults to `ios` or `android`)
- **Platform keys are optional** – You can configure only iOS, only Android, or both.

---

## 🗂 File Copy Rules

- If a file is named `Gemfile` or `Gemfile.lock`, it will be copied directly into the platform root (`ios/` or `android/`).
- All other files will be copied into the `fastlane/` folder inside the platform directory.

---

## 📌 Example Project Structure

```
my-app/
├── fastlane/
│   ├── ios/
│   │   ├── Fastfile
│   │   ├── Appfile
│   │   └── Gemfile
│   └── android/
│       ├── Fastfile
│       ├── Appfile
│       └── Gemfile
├── ios/
├── android/
└── app.config.js
```

---

## ⚠️ Notes

- This plugin runs during the **prebuild** phase of Expo.
- Make sure the source directory exists – otherwise, an error will be thrown.

---

## 📜 License

MIT License
