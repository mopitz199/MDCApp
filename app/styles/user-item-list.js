import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  userItemBorder:{
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
  },
  userItemList:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemTitle:{
    fontSize: 20,
    marginLeft: 10
  }
});
