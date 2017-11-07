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
  Alert,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import { BackHandler } from 'react-native';

// Style
import { styles } from '../styles/recover-password'

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

// Validations
import {validate} from '../utils/validation';

export default class RecoverPassword extends Component {


  constructor(props){
    super(props);
    this.state = {
      visible: false,

      emial: null,
      emailError: false,
      emailErrorMessage: '',
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white'
  });

  _successAlert(){
    Alert.alert(
      'Great!',
      'We have sent the recovery code successfully',
      [{text: 'Accept'}],
      { cancelable: false }
    )
  }

  _validateForm(){
    let fields = [
      ['email', this.state.email, 'Email'],
    ];
    v = validate(fields);
    if(!v[0]){
      utils.showAlert(v[2], v[1]);
      return v[0];
    }
    return true
  }

  _onSendCode = () => {
    if(this._validateForm()){
      this.setState({visible: true});
      let data = {'email': this.state.email}
      http.http('POST', 'generateRecoveryCode/', JSON.stringify(data), useToken=false)
      .then((response)=>{
        this.setState({visible: false});
        if(response["ok"]){
          this._successAlert()
        }else{
          utils.showAlert('Ops!', 'We couldn\'t send the email');
        }
      })
      .catch((error) => {
        this.setState({visible: false});
        utils.showAlert('Ops!', 'Sever connection');
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <View style={styles.inputContainer}>
            <Item style={styles.itemInput} floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                autoCorrect={false}
                onChangeText={(email) => {
                  let v = validate([['email', email]]);
                  this.setState({
                    email: email,
                    emailError: !v[0],
                    emailErrorMessage: v[1]
                  })
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.emailErrorMessage}</Text>
          </View>
          <TouchableOpacity onPress={this._onSendCode}>
            <View style={styles.sendCodeButton}>
              <Text style={styles.sendCodeTextButton}>SEND CODE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('insertRecoveryCode')}>
            <Text style={styles.inserCodeText}>Insert code</Text>
          </TouchableOpacity>
        </View>
      </StyleProvider>
    );
  }

}
