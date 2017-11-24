import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container:{
    padding: 25,
  },
  itemPickerContainer:{
    marginBottom: 10,
  },
  pickerText:{
    fontSize: 20,
    marginBottom: 5,
  },
  filterButton:{
    height: 40,
    backgroundColor:theme.primaryNormalColor,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  filterTextButton:{
    fontSize: 17,
    color: 'white',
  },
});
