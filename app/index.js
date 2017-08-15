/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Picker,
  ToastAndroid
} from 'react-native';

// Npm packages
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Form, Item, Input, Label, StyleProvider } from 'native-base';
import DatePicker from 'react-native-datepicker'
import { styles } from './styles/home'
import getTheme from '../native-base-theme/components';
import Camera from 'react-native-camera';

import * as theme from './styles/theme';

import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs


export default class TradeData extends Component {

  constructor(props){
    super(props);
    this.state = {
      date: '',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      datetime1: '2016-05-05 20:00'
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
      <StyleProvider  style={getTheme()}>
      <View style={styles.container}>
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Entrada</Label>
            <Input />
          </Item>
          <View style={styles.stop_profit_container}>
            <Item floatingLabel style={styles.stop_item}>
              <Label>Stop</Label>
              <Input />
            </Item>
            <Item floatingLabel style={styles.profit_item}>
              <Label>Profit</Label>
              <Input style={styles.profit_input} />
            </Item>
          </View>
          <View style={styles.datetime_container}>
            <DatePicker
              style={styles.datepicker_item}
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
              onDateChange={(date) => {this.setState({date: date})}}
            />
            <Item floatingLabel style={styles.profit_item}>
              <Label>Hora (HH:MM:SS)</Label>
              <Input style={styles.profit_input} />
            </Item>
          </View>
          <View style={styles.select_container}>
            <Picker
              style={styles.trade_type_select}
              selectedValue={this.state.trade_type}
              onValueChange={(itemValue, itemIndex) => this.setState({trade_type: itemValue})}>
              <Picker.Item label="A1" value="a1" />
              <Picker.Item label="A2" value="a2" />
              <Picker.Item label="A2" value="a2" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="80" value="80" />
              <Picker.Item label="Otra" value="othrt" />
            </Picker>
            <Picker
              style={styles.result_select}
              selectedValue={this.state.result}
              onValueChange={(itemValue, itemIndex) => this.setState({result: itemValue})}>
              <Picker.Item label="Ganada" value="win" />
              <Picker.Item label="Perdida" value="lose" />
            </Picker>
          </View>
          <View style={styles.camera_container}>
            <Camera
              ref={(cam) => {
                this.camera = cam;
              }}
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


  takePicture() {
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
            ifstream.onError((err) => {console.log('oops', err)})
            ifstream.onEnd(() => {
              // Aca obtengo el archivo en base64
              console.log(base64)
            })
        })
      })
      .catch(err => console.error(err));
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: TradeData }
});

AppRegistry.registerComponent('TradeData', () => SimpleApp);
