import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "login",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https",
    url: "http://192.168.203.176:3000",
    cleartext: true,
  },
};

export default config;
