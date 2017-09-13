import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  formContainer:{
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  pieContainer:{
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  loadButton:{
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  datesContainer:{
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  datepickerItem:{
    flex: 1,
  },
});
