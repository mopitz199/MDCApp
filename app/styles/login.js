import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'flex-end',
    backgroundColor: theme.primaryNormalColor
  },
  logo:{
    height: 85,
    width: 85,
    alignSelf: 'center',
  },
  title:{
    alignSelf: 'center',
    color: theme.secondaryTextColor,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputItem:{
    marginBottom: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  label:{
    color: theme.secondaryTextColor,
  },
  input:{
    color: theme.secondaryTextColor,
  },
  loginButton:{
    marginBottom: 30,
    backgroundColor: 'white',
  },
  loginText:{
    fontSize: 18,
    color: theme.primaryNormalColor,
    fontWeight: '400',
  }
});
