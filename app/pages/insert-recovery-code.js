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
import { styles } from '../styles/insert-recovery-code'

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

export default class InsertRecoveryCode extends Component {


  constructor(props){
    super(props);
    this.state = {
      visible: false,

      code: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white'
  });

  _onValidateCode = () => {
    // Validate codigo
    const { navigate } = this.props.navigation;
    navigate('changePassword')
  }




  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <View style={styles.inputContainer}>
            <Item style={styles.itemInput} floatingLabel>
              <Label>Code</Label>
              <Input
                value={this.state.code}
                autoCorrect={false}
                onChangeText={(code) => {
                  this.setState({
                    code: code,
                  })
                }}
              />
            </Item>
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
