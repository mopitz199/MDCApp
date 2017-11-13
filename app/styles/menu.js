import { StyleSheet, Platform, Dimensions } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
const window = Dimensions.get('window');

export default styles = StyleSheet.flatten({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: theme.primaryNormalColor,
    borderTopWidth: 15,
    borderTopColor: theme.primaryLightColor,
  },
  itemContainer:{
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer:{
    width: 40,
  },
  text:{
    color: 'white',
    fontSize: 17,
    marginLeft: 2,
  },
});
