
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f86150d7f30c4984a386027917dfe4ec',
  appName: 'Shiv Vaas Calculator',
  webDir: 'dist',
  server: {
    url: 'https://f86150d7-f30c-4984-a386-027917dfe4ec.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF8C00",
      showSpinner: false
    }
  }
};

export default config;
