import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  photo:{
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'red',
    /*width: null,
    height: null,
    resizeMode: 'cover'*/
  }
});
