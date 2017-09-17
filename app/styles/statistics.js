import { StyleSheet, Platform } from 'react-native';
import * as theme from './theme';
const platform = Platform.OS;
export const styles = StyleSheet.flatten({
  container: {
    //height: 300,
    //width: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    //borderWidth: 2,
    //borderColor: 'blue',
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
    flex:1,
    height: 40,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor:theme.primaryNormalColor,
    alignItems:'center',
    justifyContent: 'center',
  },
  loadTextButton:{
    fontSize: 17,
    color: 'white',
  },
  datesContainer:{
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  datepickerItem:{
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
  },
  firstDatepickerItem:{
    marginRight: 10,
  },
  emptyChart:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    alignSelf: 'stretch'
  },
  emptyText:{
    fontSize: 20,
    marginBottom: 30
  }
});
