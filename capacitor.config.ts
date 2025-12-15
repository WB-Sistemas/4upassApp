import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ccom.rodevito.fourupass.dev',   // tu Bundle Identifier real
  appName: '4upass',
  webDir: 'www',
  plugins: {
    Keyboard: { resize: 'ionic' as any }
  }
};

export default config;
