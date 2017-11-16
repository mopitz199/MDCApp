import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    backgroundColor: theme.primaryNormalColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    height: 135,
    width: 135,
    marginBottom: 30,
  },
  title:{
    color: theme.secondaryTextColor,
    fontSize: 20,
    fontWeight: '300',
  },
  loadingText:{
    marginTop: 70,
    color: theme.secondaryTextColor,
  }
});
