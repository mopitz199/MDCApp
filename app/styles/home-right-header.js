import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export default styles = StyleSheet.flatten({
  rightContainer:{
    flexDirection: 'row'
  },
  settingIcon:{
    marginRight: 15,
  },
  plusIcon:{
    marginRight: 15,
  }
});
