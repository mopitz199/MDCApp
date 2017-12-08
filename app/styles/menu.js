import { StyleSheet, Platform, Dimensions } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
const window = Dimensions.get('window');

export default styles = StyleSheet.flatten({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#323232',
  },
  iconContainerBorder:{
    borderBottomColor: '#666',
    borderBottomWidth: 1,
  },
  itemContainer:{
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer:{
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    color: 'white',
    fontSize: 17,
    marginLeft: 2,
  },
});
