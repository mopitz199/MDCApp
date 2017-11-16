import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export default styles = StyleSheet.create({
  sortByContainer:{
    borderWidth: 2,
    padding: 4,
    borderColor: 'red',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  sortByText:{
    fontSize: 14,
    color: theme.secondaryTextColor,
  },
});
