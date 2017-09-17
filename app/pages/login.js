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
  Image,
  TouchableHighlight
} from 'react-native';

import { BackHandler } from 'react-native';

// Style
import { styles } from '../styles/login'

// Npm packages
import { StackNavigator, NavigationActions } from 'react-navigation';
import { Container, Header, Content, Form, Item, Input, Label, StyleProvider, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

export default class Login extends Component {


  constructor(props){
    super(props);
    this.navigate = this.props.navigation.navigate;
    this.state = {
      visible: false,
      username: null,
      password: null,

      usernameError: null,
      visible: false,
    };
  }

  componentWillMount(){
    this._logout();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
  }

  static navigationOptions = {
    header: null,
  };

  _handleBackPress = () => {
    return true;
  };


  _logout = () =>{
    global.storage.remove({
    	key: 'token'
    });
    global.storage.remove({
    	key: 'user'
    });
  }

  _getCurrentUser(){
    resp = http.http('GET', 'users/getCurrentUser/')
    if(resp!=null){
      resp.then((response) => response.json())
      .then((responseJson)=>{
        global.storage.save({
          key: 'user',
          data: responseJson,
          expires: 1000 * 3600 * 24 * 7
        })
        .then(()=>{
          this.setState({visible: false});
          this.props.navigation.navigate('home')
        });
      })
      .catch((error) => {
        this.setState({visible: false});
        utils.showAlert('Error', 'Al conectarse con el servicio');
      });
    }else{
      this.setState({visible: false});
      utils.showAlert('Error', 'Al conectarse con el servicio');
    }
  }

  _onLogin = () =>{
    this.setState({visible: true});
    return fetch(global.url+'api-token-auth/',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.hasOwnProperty('token')){
          global.storage.save({
          	key: 'token',
          	data: responseJson.token,
          	expires: 1000 * 3600 * 24 * 7
          })
          .then(()=>{
            this._getCurrentUser();
          });
        }else{
          this.setState({visible: false});
          utils.showAlert("Error", "Credenciales erroneas");
        }
      })
      .catch((error) => {
        this.setState({visible: false});
        utils.showAlert("Error", "Credenciales erroneas");
      });
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <Image
            style={styles.logo}
            source={require('../images/logo.png')}
          />
          <Text style={styles.title}>MDC</Text>
          <Item style={styles.inputItem} floatingLabel>
            <Label style={styles.label}>Username</Label>
            <Input
              style={styles.input}
              onChangeText={(username) => {
                this.setState({username: username})
              }}
            />
          </Item>
          <Item style={styles.inputItem} floatingLabel>
            <Label style={styles.label}>Password</Label>
            <Input
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password: password})}
            />
          </Item>
          <Button
            style={styles.loginButton}
            onPress={this._onLogin}
            full>
            <Text style={styles.loginText}>SIGN IN!</Text>
          </Button>
        </View>
      </StyleProvider>
    );
  }

}
