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
    color: theme.primaryTextColor,
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  inputItem:{
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  label:{
    color: theme.primaryTextColor,
  },
  input:{
    color: theme.primaryTextColor,
  },
  loginButton:{
    marginBottom: 30,
    backgroundColor: theme.secondaryNormalColor,
  },
  loginText:{
    fontSize: 18,
    color: theme.secondaryTextColor,
    fontWeight: '400',
  }
});
