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
} from 'react-native';

import { DeviceEventEmitter } from 'react-native';

// Style
import { styles } from '../styles/create-trade'

import { Form, Item, Input, Label, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Camera from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

// Get the default theme
import getTheme from '../../native-base-theme/components';

import CustomCalendarIcon from '../components/custom-calendar-icon';

import Dimensions from 'Dimensions';

import ImageResizer from 'react-native-image-resizer';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Module to convert
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs

// Validations
import {validate} from '../utils/validation';

export default class CreateTrade extends Component {

  constructor(props){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {

      didMount: false,
      result: "w",
      tradeType: "other",
      date: moment().format("YYYY-MM-DD"),
      orientation: Dimensions.get('window').width>Dimensions.get('window').height?'landscape':'portrait',
      photo: null,


      visible: true,

      enter: null,
      enterError: false,
      enterErrorMessage: '',

      stop: null,
      stopError: false,
      stopErrorMessage: '',

      profit: null,
      profitError: false,
      profitErrorMessage: '',

      time: null,
      timeError: false,
      timeErrorMessage: '',

    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: 'Create Trade'
  });

  componentDidMount(){
    setTimeout(() => this.setState({didMount: true}, () => {
      this.setState({visible:false})
    }), 1)
    Dimensions.addEventListener('change', this._onChangeOrientation);
  }

  componentWillUnmount(){
    Dimensions.removeEventListener('change', this._onChangeOrientation);
  }


  _onChangeOrientation = ({ window: { width, height } }) => {
    this.setState({
      orientation: width>height?'landscape':'portrait'
    })
  }


  _buildTradeObject(){
    return {
      enter: this.state.enter,
      stop: this.state.stop,
      profit: this.state.profit,
      date: this.state.date,
      result: this.state.result,
      tradeType: this.state.tradeType,
      date: this.state.date,
      photo: this.state.photo,
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


  _successAlert(){
    Alert.alert(
      'Great!',
      'It has been saved successfully',
      [{text: 'Accept', onPress: this._onPressSuccessAlert}],
      { cancelable: false }
    )
  }


  _onPressSuccessAlert = () => {
    this._onBackButton()
    DeviceEventEmitter.emit('tradeCreated',  {})
  }


  _takePicture() {
    if(this._validateForm()){
      this.setState({visible: true});
      const options = {};
      this.camera.capture({metadata: options})
      .then((data) => {
        ImageResizer.createResizedImage(data["path"], 700, 700, 'JPEG', 100).then((response) => {
          // Here we have the response with the resized uri
          let base64 = ''
          fs.readStream(
              response.uri,
              'base64',
              4095)
          .then((ifstream) => {
            ifstream.open()
            ifstream.onData((chunk) => {base64 += chunk})
            ifstream.onError((err) => {utils.showAlert('Error', err)})
            ifstream.onEnd(() => {
              // Here we have the base64 of resized image
              let img = "data:image/png;base64,"+base64;
              let trade = this._buildTradeObject();
              trade['photo'] = img;
              http.http('post', 'trades/', JSON.stringify(trade))
              .then((resp)=>{
                this.setState({visible: false});
                if(resp["ok"]){
                  this._successAlert()
                }else{
                  let error = utils.getError(resp);
                  utils.showAlert(error[0], error[1]);
                }
              })
              .catch((error) => {
                this.setState({visible: false});
                utils.showAlert('Ops', 'Problem connecting to the server');
              });
            })
          })
          .catch(err => {
            this.setState({visible: false});
            utils.showAlert('Ops', 'Problem reading the picture');
          });
        }).catch((err) => {
          this.setState({visible: false});
          utils.showAlert('Ops', 'Problem resizing the picture');
        });

      })
      .catch(err => {
        this.setState({visible: false});
        utils.showAlert('Error', 'Al sacar la foto');
      });
    }
  }


  _portraitFormRender(){
    return (
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
                value={this.time}
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
        <View style={[
          styles.cameraContainer,
          this.state.orientation=='landscape'?styles.cameraLandscapeContainer:null,
          this.state.orientation=='landscape'?{
            height: Dimensions.get('window').height-global.statusBarHeight-global.navBarHeight,
            width: Dimensions.get('window').width
          }:null,
        ]}>
          <Camera
            ref={(cam) => {this.camera = cam;}}
            style={styles.camera}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.capture} onPress={this._takePicture.bind(this)}>GUARDAR</Text>
          </Camera>
        </View>
      </Form>
    )
  }


  _portraitRender(){
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          {this.state.didMount?this._portraitFormRender():null}
        </View>
      </StyleProvider>
    );
  }


  _landscapeRender(){
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <Form style={styles.form}>
            <View style={styles.cameraContainer}>
              <Camera
                ref={(cam) => {this.camera = cam;}}
                style={styles.camera}
                aspect={Camera.constants.Aspect.fill}>
                <Text style={styles.capture} onPress={this._takePicture.bind(this)}>GUARDAR</Text>
              </Camera>
            </View>
          </Form>
        </View>
      </StyleProvider>
    );
  }


  render() {
    if(this.state.orientation=='portrait'){
      return this._portraitRender();
    }else{
      return this._portraitRender();
    }
  }
}
