import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MoneyAssist',
  webDir: 'dist',
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "33960040607-coalo6hl8cscmu8mngtb3rf6jgnibr5q.apps.googleusercontent.com"
    }
  },
  bundledWebRuntime: false
};

export default config;
