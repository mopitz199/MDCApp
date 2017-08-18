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

import * as theme from '../styles/theme';

import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs


export default class CreateTrade extends Component {

  constructor(props){
    super(props);
    this.trade = {
      enter: null,
      stop: null,
      profit: null,
      date: moment().format("YYYY-MM-DD"),
      time: null,
      trade_type: "other",
      result: "w",
      photo: null,
    }
    this.state = {
      trade: this.trade,
      date: null,
      result: null,
      visible: false,
      trade_type: "other",
      result: "w",
      date: moment().format("YYYY-MM-DD"),
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
              <Label>Entrada</Label>
              <Input
                onChangeText={(text) => {this.trade.enter=text}}
              />
            </Item>
            <View style={styles.stop_profit_container}>
              <Item floatingLabel style={styles.stop_item}>
                <Label>Stop</Label>
                <Input
                  onChangeText={(text) => {this.trade.stop=text}}
                />
              </Item>
              <Item floatingLabel style={styles.profit_item}>
                <Label>Profit</Label>
                <Input
                  onChangeText={(text) => {this.trade.profit=text}}
                />
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
                onDateChange={(date) => {
                  this.setState({date: date})
                  this.trade.date=date
                }}
              />
              <Item floatingLabel style={styles.profit_item}>
                <Label>Hora (HH:MM:SS)</Label>
                <Input
                  style={styles.profit_input}
                  value={this.trade.time}
                  onChangeText={(text) => {this.trade.time=text}}
                />
              </Item>
            </View>
            <View style={styles.select_container}>
              <Picker
                style={styles.trade_type_select}
                selectedValue={this.state.trade_type}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({trade_type: itemValue})
                  this.trade.trade_type=itemValue
                }}>
                <Picker.Item label="A1" value="a1" />
                <Picker.Item label="A2" value="a2" />
                <Picker.Item label="A2" value="a2" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="80" value="80" />
                <Picker.Item label="Otra" value="other" />
              </Picker>
              <Picker
                style={styles.result_select}
                selectedValue={this.state.result}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({result: itemValue})
                  this.trade.result=itemValue
                }}>
                <Picker.Item label="Ganada" value="w" />
                <Picker.Item label="Perdida" value="l" />
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
            ifstream.onError((err) => {console.log('oops', err)})
            ifstream.onEnd(() => {
              // Aca obtengo el archivo en base64
              let img = "data:image/png;base64,"+base64;
              //this.trade.photo = img;
              console.warn(JSON.stringify(this.trade));
              fetch('http://192.168.0.12:8000/trades/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  image: img,
                })
              })
              .then((response)=>{
                this.setState({visible: false});
                Alert.alert(
                  'Exito',
                  'Se ha guardado correctamnte',
                  [
                    {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              })
              .catch((error) => {
                this.setState({visible: false});
                Alert.alert(
                  'Error',
                  'Al conectarse con el servicio',
                  [
                    {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
                  ],
                  { cancelable: false }
                )
              });
            })
        })
        .catch(err => {
          this.setState({visible: false});
          Alert.alert(
            'Error',
            'Al leer la foto',
            [
              {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
          )
        });
      })
      .catch(err => {
        this.setState({visible: false});
        Alert.alert(
          'Error',
          'Al sacar la foto',
          [
            {text: 'Aceptar', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        )
      });
  }

}
