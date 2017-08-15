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
  stop_profit_container: {
    flexDirection: 'row',
  },
  stop_item: {
    flex: 1,
  },
  profit_item: {
    flex: 1,
  },
  datetime_container:{
    flexDirection: 'row',
  },
  datepicker_item:{
    marginTop:30,
    flex: 1,
    borderColor: '#cccaca',
    borderBottomWidth: 1,
    marginLeft: 14
  },
  select_container:{
    flexDirection: 'row',
  },
  trade_type_select:{
    flex: 1,
    marginLeft:15,
    marginRight: -15
  },
  result_select:{
    flex: 1,
    marginLeft:30,
  },
  camera_container:{
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
  }
});
