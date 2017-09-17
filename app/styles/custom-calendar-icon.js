import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;

export default StyleSheet.create({
  datepickerIcon:{
    position: 'absolute',
    left: 0,
    top: 4,
    color: theme.primaryTextColor,
    marginLeft: 0
  },
});
