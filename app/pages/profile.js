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
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// Style
import { styles } from '../styles/profile'

import { Form, Item, Input, Label, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

import Dimensions from 'Dimensions';

// Import utils
import * as utils from '../utils/utils';

// Import http service
import * as http from '../utils/http';

// Import the custom theme
import * as theme from '../styles/theme';

// Validations
import {validate} from '../utils/validation';

export default class Profile extends Component {

  constructor(props){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {

      user: null,

      visible: true,

      userLoaded: false,

      emailError: false,
      emailErrorMessage: '',

      usernameError: false,
      usernameErrorMessage: '',

    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: 'Profile',
    drawerLabel: 'Profile',
    drawerIcon: () => (
      <Icon
        name={'user'}
        size={20}
        color={'#ffa65d'}
      />
    )
  });

  componentDidMount(){
    global.storage.load({
      key: 'user',
    }).then(ret => {
      this.setState({
        'visible': false,
        'user': ret,
        'username': ret['username'],
        'email': ret['email'],
        'name': ret['first_name'],
        'lastName': ret['last_name'],
        'userLoaded': true
      })
    }).catch(err => {
      console.warn(err)
    })
  }

  _validateForm(){
    let fields = [
      ['username', this.state.username, 'Username'],
      ['email', this.state.email, 'Email']
    ];
    v = validate(fields);
    if(!v[0]){
      utils.showAlert(v[2], v[1]);
      return v[0];
    }
    return true
  }

  _onPressSuccessAlert = () => {
    const {goBack} = this.props.navigation;
    const user = this.state.user;
    user['username'] = this.state.username
    user['email'] = this.state.email
    user['first_name'] = this.state.name
    user['last_name'] = this.state.lastName
    global.storage.save({
      key: 'user',
      data: user,
      expires: 1000 * 3600 * 24 * 7
    })
    .then(()=>{
      goBack();
    });
  }

  _successAlert(){
    Alert.alert(
      'Great!',
      'Se ha guardado correctamnte',
      [{text: 'Accept', onPress: this._onPressSuccessAlert}],
      { cancelable: false }
    )
  }

  _onSaveButton = () => {
    this.setState({visible: true});
    if(this._validateForm()){
      let data = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.name,
        last_name: this.state.lastName
      }
      http.http('put', 'users/'+this.state.user.id+"/", JSON.stringify(data))
      .then((response)=>{
        this.setState({visible: false});
        if(response["ok"]){
          this._successAlert()
        }else{
          let error = utils.getError(response);
          utils.showAlert(error[0], error[1]);
        }
      })
      .catch((error) => {
        this.setState({visible: false});
        utils.showAlert('Error', 'Al conectarse con el servicio');
      });
    }
  }

  _renderForm(){
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              value={this.state.username}
              autoCorrect={false}
              onChangeText={(username) => {
                let v = validate([['username', username]]);
                this.setState({
                  username: username,
                  usernameError: !v[0],
                  usernameErrorMessage: v[1]
                })
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.usernameErrorMessage}</Text>
        </View>
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
        <Item style={styles.itemInput} floatingLabel>
          <Label>Name</Label>
          <Input
            autoCorrect={false}
            value={this.state.name}
            onChangeText={(name) => this.setState({name: name})}
          />
        </Item>
        <Item style={styles.itemInput} floatingLabel>
          <Label>Last Name</Label>
          <Input
            autoCorrect={false}
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({lastName: lastName})}
          />
        </Item>
        <TouchableOpacity
          onPress={this._onSaveButton}
          >
          <View style={styles.saveButton}>
            <Text style={styles.saveTextButton}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  render() {
    return (
      <StyleProvider style={getTheme()}>
        {this.state.userLoaded?this._renderForm():<View></View>}
      </StyleProvider>
    )
  }

}
