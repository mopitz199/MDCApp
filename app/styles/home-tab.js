import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const homeTabStyles = StyleSheet.flatten({
  tabbar:{
    backgroundColor: theme.primaryLightColor,
  },
  tab:{
    //color: theme.secondaryDarkColor
  }
});
