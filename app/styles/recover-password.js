import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    backgroundColor: theme.secondaryTextColor,
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
  errorMessage:{
    color: theme.errorColor,
  },
  sendCodeButton:{
    height: 40,
    backgroundColor:theme.primaryNormalColor,
    alignItems:'center',
    justifyContent: 'center',
  },
  sendCodeTextButton:{
    fontSize: 17,
    color: 'white',
  },
  inserCodeText:{
    marginTop: 10,
    fontSize: 17,
    alignSelf: 'center',
  }
});
