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
} from 'react-native';

// Style
import { styles } from '../styles/create-trade'

// Npm packages
import { StackNavigator } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker'
import Camera from 'react-native-camera';
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Module to convert
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs


export default class CreateTrade extends Component {

  constructor(props){
    super(props);
    this.state = {

      enter: null,
      stop: null,
      profit: null,
      date: null,
      result: "w",
      tradeType: "other",
      date: moment().format("YYYY-MM-DD"),
      photo: null,
      time: null,

      visible: false,

      hasEnter: false,
      hasStop: false,
      hasProfit: false,
      hasDate: false,
      hasTime: false,
    };
  }

  static navigationOptions = {
    title: 'MDC Capital',
    headerStyle:{ backgroundColor: theme.primaryColor},
    headerTitleStyle:{ color: 'white'},
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label>
                Enter
                <Text style={[styles.requiredInput,!this.state.hasEnter ? theme.inputError.inputError : null]}> *</Text>
              </Label>
              <Input
                onChangeText={(text) => {
                  this.setState({enter: text});
                  text!="" ? this.setState({hasEnter: true}) : this.setState({hasEnter: false})
                }}
              />
            </Item>
            <View style={styles.stopProfitContainer}>
              <Item floatingLabel style={styles.stopItem}>
                <Label>
                  Stop
                  <Text style={[styles.requiredInput,!this.state.hasStop ? theme.inputError.inputError : null]}> *</Text>
                </Label>
                <Input
                  onChangeText={(text) => {
                    this.setState({stop: text})
                    text!="" ? this.setState({hasStop: true}) : this.setState({hasStop: false})
                  }}
                />
              </Item>
              <Item floatingLabel style={styles.profitItem}>
                <Label>
                  Profit
                  <Text style={[styles.requiredInput,!this.state.hasProfit ? theme.inputError.inputError : null]}> *</Text>
                </Label>
                <Input
                  onChangeText={(text) => {
                    this.setState({profit: text})
                    text!="" ? this.setState({hasProfit: true}) : this.setState({hasProfit: false})
                  }}
                />
              </Item>
            </View>
            <View style={styles.datetimeContainer}>
              <DatePicker
                style={styles.datepickerItem}
                date={this.state.date}
                mode="date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: -10,
                    top: 4,
                  },
                  dateInput: {
                    marginLeft: -20,
                    borderWidth: 0,
                  }
                }}
                onDateChange={(date) => this.setState({date: date}) }
              />
              <Item floatingLabel style={styles.profitItem}>
                <Label>
                  Hora (HH:MM:SS)
                  <Text style={[styles.requiredInput,!this.state.hasTime ? theme.inputError.inputError : null]}> *</Text>
                </Label>
                <Input
                  value={this.time}
                  onChangeText={(text) => {
                    this.setState({time: text})
                    text!="" ? this.setState({hasTime: true}) : this.setState({hasTime: false})
                  }}
                />
              </Item>
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
            <View style={styles.cameraContainer}>
              <Camera
                ref={(cam) => {this.camera = cam;}}
                style={styles.camera}
                aspect={Camera.constants.Aspect.fill}>
                <Text style={styles.capture} onPress={this.takePicture.bind(this)}>GUARDAR</Text>
              </Camera>
            </View>
          </Form>
        </View>
    </StyleProvider>
    );
  }

  buildTradeObject(){
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

  takePicture() {
    this.setState({visible: true});
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => {
        let base64 = ''
        fs.readStream(
            data["path"],
            'base64',
            4095)
        .then((ifstream) => {
          ifstream.open()
          ifstream.onData((chunk) => {base64 += chunk})
          ifstream.onError((err) => {utils.showAlert('Error', err)})
          ifstream.onEnd(() => {
            // Aca obtengo el archivo en base64
            let img = "data:image/png;base64,"+base64;
            let trade = this.buildTradeObject();
            trade['photo'] = img;
            resp = http.http('post', 'trades/', JSON.stringify(trade));
            if(resp!=null){
              resp.then((response)=>{
                this.setState({visible: false});
                if(response["ok"]){
                  utils.showAlert('Exito', 'Se ha guardado correctamnte');
                }else{
                  let error = utils.getError(response);
                  utils.showAlert(error[0], error[1]);
                }
              })
              resp.catch((error) => {
                this.setState({visible: false});
                utils.showAlert('Error', 'Al conectarse con el servicio');
              });
            }else{
              this.setState({visible: false});
            }
          })
        })
        .catch(err => {
          this.setState({visible: false});
          utils.showAlert('Error', 'Al leer la foto');
        });
      })
      .catch(err => {
        this.setState({visible: false});
        utils.showAlert('Error', 'Al sacar la foto');
      });
  }

}
