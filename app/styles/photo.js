import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomContainerText:{
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  bottomTitleText:{
    fontSize: 17,
    fontWeight: '700',
    color:'white',
    marginRight: 7,
  },
  bottomTextValue:{
    fontSize: 17,
    fontWeight: 'normal',
    color:'white',
  },
  bottomIcons:{
    marginRight: 7,
  }
});
