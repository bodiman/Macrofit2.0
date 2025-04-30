import { Platform } from 'react-native';

let useSSO = () => ({
  startSSO: async () => {
    console.warn('SSO not supported on web');
  },
});

if (Platform.OS !== 'web') {
  useSSO = require('@clerk/clerk-expo').useSSO;
}

export default useSSO;