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
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import { BackHandler } from 'react-native';

// Style
import { styles } from '../styles/change-password'

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

export default class ChangePassword extends Component {


  constructor(props){
    super(props);
    this.state = {
      visible: false,

      password: null,
      passwordError: false,
      passwordErrorMessage: '',

      repeatPassword: null,
      repeatPasswordError: false,
      repeatPasswordErrorMessage: '',

    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white'
  });

  _onValidateCode = () => {
    // Validate codigo
  }




  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <View style={styles.inputContainer}>
            <Item style={styles.itemInput} floatingLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(password) => {
                  let v = validate([['password', password]]);
                  this.setState({
                    password: password,
                    passwordError: !v[0],
                    passwordErrorMessage: v[1]
                  })
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.passwordErrorMessage}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Item style={styles.itemInput} floatingLabel>
              <Label>Repeat Password</Label>
              <Input
                value={this.state.repeatPassword}
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(repeatPassword) => {
                  let v = validate([['password', repeatPassword]]);
                  this.setState({
                    repeatPassword: repeatPassword,
                    repeatPasswordError: !v[0],
                    repeatPasswordErrorMessage: v[1]
                  })
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.repeatPasswordErrorMessage}</Text>
          </View>
          <TouchableOpacity onPress={this._onValidateCode}>
            <View style={styles.validateCodeButton}>
              <Text style={styles.validateCodeTextButton}>VALIDATE CODE</Text>
            </View>
          </TouchableOpacity>
        </View>
      </StyleProvider>
    );
  }

}
