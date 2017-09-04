import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 255, 255)"
  },

  form: {
    flex: 1,
  },

  // Style of every input item of react native base
  inputItem:{
    marginTop: 10,
    marginLeft: 0,
  },

  input:{
    color: theme.secondaryTextColor,
  },

  errorMessage:{
    color: theme.errorColor,
  },

  inputItemError:{
    borderColor: theme.errorColor,
  },

  enterContainer:{
    marginLeft: 10,
    marginRight: 10,
  },

  stopProfitContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  stopContainer: {
    flex: 1,
    marginRight: 10,
  },

  profitContainer: {
    flex: 1,
  },

  timeContainer: {
    flex: 1,
  },

  datetimeContainer:{
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  datepickerItem:{
    marginTop:30,
    marginBottom:20,
    marginRight: 10,
    flex: 1,
    borderColor: '#cccaca',
    borderBottomWidth: 1,
  },

  selectContainer:{
    flexDirection: 'row',
  },

  tradeTypeSelect:{
    flex: 1,
    marginLeft:15,
    marginRight: -15,
    color: theme.secondaryTextColor,
  },

  resultSelect:{
    flex: 1,
    marginLeft:30,
    color: theme.secondaryTextColor,
  },

  // Styles of the camera
  cameraContainer:{
    flex: 1
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: theme.primaryNormalColor,
    color: theme.primaryTextColor,
    borderRadius: 5,
    padding: 10,
    margin: 10
  }
});
