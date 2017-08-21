import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.secondaryColor
  },
  form: {
    flex: 1,
  },
  stopProfitContainer: {
    flexDirection: 'row',
  },
  stopItem: {
    flex: 1,
  },
  profitItem: {
    flex: 1,
  },
  datetimeContainer:{
    flexDirection: 'row',
  },
  datepickerItem:{
    marginTop:30,
    flex: 1,
    borderColor: '#cccaca',
    borderBottomWidth: 1,
    marginLeft: 14
  },
  selectContainer:{
    flexDirection: 'row',
  },
  tradeTypeSelect:{
    flex: 1,
    marginLeft:15,
    marginRight: -15
  },
  resultSelect:{
    flex: 1,
    marginLeft:30,
  },
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
    backgroundColor: theme.primaryColor,
    color: theme.secondaryColor,
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  requiredInput:{
    color: theme.secondaryColor,
  }
});
