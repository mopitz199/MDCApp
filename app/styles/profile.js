import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
  },
  inputContainer:{
    marginBottom: 10
  },
  itemInput:{
    marginBottom: 10
  },
  saveButton:{
    height: 40,
    backgroundColor:theme.primaryNormalColor,
    alignItems:'center',
    justifyContent: 'center',
  },
  saveTextButton:{
    fontSize: 17,
    color: 'white',
  },
  errorMessage:{
    color: theme.errorColor,
  },
});
