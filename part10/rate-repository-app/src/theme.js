import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    backgroundAppBar: '#24292e',
    backgroundRepoList: '#e1e4e8',
    backgroundRepoItem: 'white',
    backgroundMain: '#e3e3e3',
    textAppbar: '#FFFFFF',
    primary: '#0366d6',
    alert: '#FF0000',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    })
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;