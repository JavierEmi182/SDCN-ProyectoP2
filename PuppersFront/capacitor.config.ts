import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.puppers.app',
  appName: 'Puppers',
  webDir: 'dist/puppers-client',
  server: {
    androidScheme: 'https'
  }
};

export default config;
