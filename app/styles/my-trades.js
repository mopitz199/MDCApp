import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  toolBarContainer:{
    flexDirection: 'row',
    padding: platform=="ios"?8:0,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.borderColor,
    borderBottomWidth: 1,
    backgroundColor: '#d9d9d9',
  },
  iosPicker:{
    flex: 1,
  },
  androidPicker:{
    flex: 1.3,
    borderWidth: 2,
    borderColor: 'red',
  },
  filterButtonContainer:{
    flex: 1,
    alignItems: 'center'
  },
  filterText:{
    fontSize: 17,
  }
});
