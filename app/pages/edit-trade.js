/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Picker,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { DeviceEventEmitter } from 'react-native';

// Style
import { styles } from '../styles/edit-trade'

import { Form, Item, Input, Label, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';
import { NavigationActions } from 'react-navigation';

// Get the default theme
import getTheme from '../../native-base-theme/components';

import CustomCalendarIcon from '../components/custom-calendar-icon';

import Dimensions from 'Dimensions';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Validations
import {validate} from '../utils/validation';

const resetActionHome = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'home'})]
});

export default class EditTrade extends Component {

  constructor(props){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      tradeLoaded: false,

      id: this.props.navigation.state.params.trade.id,
      user: this.props.navigation.state.params.trade.user,

      date: this.props.navigation.state.params.trade.date,
      result: this.props.navigation.state.params.trade.result,
      tradeType: this.props.navigation.state.params.trade.tradeType,

      visible: true,

      enter: this.props.navigation.state.params.trade.enter,
      enterError: false,
      enterErrorMessage: '',

      stop: this.props.navigation.state.params.trade.stop,
      stopError: false,
      stopErrorMessage: '',

      profit: this.props.navigation.state.params.trade.profit,
      profitError: false,
      profitErrorMessage: '',

      time: this.props.navigation.state.params.trade.time,
      timeError: false,
      timeErrorMessage: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle:{ backgroundColor: theme.primaryNormalColor},
      headerTintColor: 'white',
      headerRight: <TouchableOpacity onPress={() => params._onDeleteButton()}>
        <Icon
          name="trash"
          style={{marginRight: 15}}
          size={25}
          color={theme.secondaryTextColor}
        />
      </TouchableOpacity>
    }
  };

  componentDidMount(){
    this.setState({visible: false, tradeLoaded: true})
    this.props.navigation.setParams({ _onDeleteButton: this._onDeleteButton });
  }


  _buildTradeObject(){
    return {
      id: this.state.id,
      user: this.state.user,
      enter: this.state.enter,
      stop: this.state.stop,
      profit: this.state.profit,
      date: this.state.date,
      result: this.state.result,
      tradeType: this.state.tradeType,
      time: this.state.time,
    }
  }


  _validateForm(){
    let fields = [
      ['decimal', this.state.enter, 'Enter'],
      ['decimal', this.state.stop, 'Stop'],
      ['decimal', this.state.profit, 'Profit'],
      ['time', this.state.time, 'Time']
    ];
    v = validate(fields);
    if(!v[0]){
      utils.showAlert(v[2], v[1]);
      return v[0];
    }
    return true
  }


  _onBackButton = () => {
    const {goBack} = this.props.navigation;
    goBack();
  }


  _successAlert(method){
    let message = ""
    if(method=='put'){message = 'It has been edited successfully';}
    else{message = 'It has been deleted successfully';}
    Alert.alert(
      'Great!',
      message,
      [{
        text: 'Accept',
        onPress: method=='delete'? this._onPressSuccessDeletedAlert: this._onPressSuccessEditedAlert
      }],
      { cancelable: false }
    )
  }


  _onPressSuccessEditedAlert = () => {
    this.props.navigation.dispatch(resetActionHome);
    DeviceEventEmitter.emit('tradeEdited',  {})
  }

  _onPressSuccessDeletedAlert = () => {
    this.props.navigation.dispatch(resetActionHome);
    DeviceEventEmitter.emit('tradeDeleted',  {})
  }


  _onDeleteButton = () => {
    this.setState({visible:true})
    http.http('DELETE', 'trades/'+this.state.id+"/")
    .then((response) => {
      this.setState({visible: false});
      this._successAlert('delete')
    })
    .catch((error) => {
      this.setState({visible: false});
      utils.showAlert('Error', 'Al conectarse con el servicio');
    });
  }


  _onSaveButton = () =>{
    this.setState({visible: true});
    this._updateTrade()
  }

  _updateTrade(){
    let trade = this._buildTradeObject()
    http.http('put', 'trades/'+trade.id+"/", JSON.stringify(trade))
    .then((response)=>{
      this.setState({visible: false});
      if(response["ok"]){
        this._successAlert('put')
      }else{
        let error = utils.getError(response);
        utils.showAlert(error[0], error[1]);
      }
    })
    .catch((error) => {
      this.setState({visible: false});
      utils.showAlert('Error', 'Connecting to server');
    });
  }


  _tradeForm(){
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
        <Form style={styles.form}>
          <View style={styles.enterContainer}>
            <Item floatingLabel error={this.state.enterError} style={[styles.inputItem, this.state.enterError?styles.inputItemError:null]}>
              <Label style={styles.input}>
                Enter
                <Text style={theme.inputRequired.enabled}> *</Text>
              </Label>
              <Input
                keyboardType={'numeric'}
                autoCorrect={false}
                value={this.state.enter}
                onChangeText={(enter) => {
                  this.setState({enter: enter});
                  let v = validate([['decimal', enter]]);
                  this.setState({enterError: !v[0], enterErrorMessage: v[1]})
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.enterErrorMessage}</Text>
          </View>
          <View style={styles.stopProfitContainer}>
            <View style={styles.stopContainer}>
              <Item floatingLabel error={this.state.stopError} style={[styles.inputItem, this.state.stopError?styles.inputItemError:null]}>
                <Label style={styles.input}>
                  Stop
                  <Text style={theme.inputRequired.enabled}> *</Text>
                </Label>
                <Input
                  keyboardType={'numeric'}
                  autoCorrect={false}
                  value={this.state.stop}
                  onChangeText={(stop) => {
                    this.setState({stop: stop})
                    let v = validate([['decimal', stop]]);
                    this.setState({stopError: !v[0], stopErrorMessage: v[1]})
                  }}
                />
              </Item>
              <Text style={styles.errorMessage}>{this.state.stopErrorMessage}</Text>
            </View>
            <View style={styles.profitContainer}>
              <Item floatingLabel error={this.state.profitError} style={[styles.inputItem, this.state.profitError?styles.inputItemError:null]}>
                <Label style={styles.input}>
                  Profit
                  <Text style={theme.inputRequired.enabled}> *</Text>
                </Label>
                <Input
                  keyboardType={'numeric'}
                  autoCorrect={false}
                  value={this.state.profit}
                  onChangeText={(profit) => {
                    this.setState({profit: profit})
                    let v = validate([['decimal', profit]]);
                    this.setState({profitError: !v[0], profitErrorMessage: v[1]})
                  }}
                />
              </Item>
              <Text style={styles.errorMessage}>{this.state.profitErrorMessage}</Text>
            </View>
          </View>
          <View style={styles.datetimeContainer}>
            <DatePicker
              style={styles.datepickerItem}
              date={this.state.date}
              mode="date"
              format="YYYY-MM-DD"
              iconComponent= {<CustomCalendarIcon />}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  marginLeft: -20,
                  borderWidth: 0,
                },
                dateText:{
                  color: theme.primaryTextColor,
                }
              }}
              onDateChange={(date) => this.setState({date: date}) }
            />
            <View style={styles.timeContainer}>
              <Item floatingLabel error={this.state.timeError} style={[styles.inputItem, this.state.timeError?styles.inputItemError:null]}>
                <Label style={styles.input}>
                  Hora(HH:MM:SS)
                  <Text style={theme.inputRequired.enabled}> *</Text>
                </Label>
                <Input
                  autoCorrect={false}
                  value={this.state.time}
                  onChangeText={(time) => {
                    this.setState({time: time})
                    let v = validate([['time', time]]);
                    this.setState({timeError: !v[0], timeErrorMessage: v[1]})
                  }}
                />
              </Item>
              <Text style={styles.errorMessage}>{this.state.timeErrorMessage}</Text>
            </View>
          </View>
          <View style={styles.selectContainer}>
            <Picker
              style={styles.tradeTypeSelect}
              selectedValue={this.state.tradeType}
              value={this.state.tradeType}
              onValueChange={(itemValue, itemIndex) => this.setState({tradeType: itemValue}) }
              >
              <Picker.Item label="A1" value="a1" />
              <Picker.Item label="A2" value="a2" />
              <Picker.Item label="A3" value="a3" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="80" value="80" />
              <Picker.Item label="CBOT" value="cbot" />
              <Picker.Item label="XOVER" value="xover" />
              <Picker.Item label="Otra" value="other" />
            </Picker>
            <Picker
              style={styles.resultSelect}
              selectedValue={this.state.result}
              onValueChange={(itemValue, itemIndex) => this.setState({result: itemValue})}
              >
              <Picker.Item label="Ganada" value="w" />
              <Picker.Item label="Perdida" value="l" />
            </Picker>
          </View>
          <TouchableOpacity
            onPress={this._onSaveButton}
            >
            <View style={styles.saveButton}>
              <Text style={styles.saveTextButton}>SAVE</Text>
            </View>
          </TouchableOpacity>
        </Form>
      </View>
    )
  }

  render() {
    return(
      <StyleProvider style={getTheme()}>
        {this.state.tradeLoaded?this._tradeForm():<View></View>}
      </StyleProvider>
    )
  }
}
