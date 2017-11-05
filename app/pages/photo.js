/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
  Alert
} from 'react-native';

import Dimensions from 'Dimensions';

import { DeviceEventEmitter } from 'react-native';

// Style
import { styles } from '../styles/photo';

// Npm packages
import { StackNavigator, NavigationActions } from 'react-navigation';

// Npm packages
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleProvider } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the default theme
import getTheme from '../../native-base-theme/components';

// Import http service
import * as http from '../utils/http';

// Import utils
import * as utils from '../utils/utils';

// Import the custom theme
import * as theme from '../styles/theme';

import CustomImage from '../components/custom-image';

import ImageZoom from 'react-native-image-pan-zoom';

export default class Photo extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    header: null,
  });

  constructor(props){
    super(props);
    this.state = {
      visible: true,
      orientation: Dimensions.get('window').width>Dimensions.get('window').height?'landscape':'portrait',
      params: props.navigation.state.params,
      dimensionLoaded: false,
      showRemoveIcon: false,
    }
    this._loadCurrentUser();
  }


  componentDidMount(){
    let height = Dimensions.get('window').height
    this.setState({
      height: this.state.orientation=='landscape'?height-global.statusBarHeight:height,
      width: Dimensions.get('window').width,
      dimensionLoaded: true,
      showOptions: true,
      visible: false,
    });

    Dimensions.addEventListener('change', this._onChangeOrientation);

  }

  componentWillUnmount(){
    Dimensions.removeEventListener('change', this._onChangeOrientation);
  }


  _loadCurrentUser(){
    global.storage.load({
      key: 'user',
    }).then(ret => {
      if(ret.id==this.state.params.trade.user){
        this.setState({showRemoveIcon: true})
      }
    }).catch(err => {
      utils.showAlert(err.name, err.message);
    })
  }

  _onChangeOrientation = ({ window: { width, height } }) => {
    this.setState({
      orientation: width>height?'landscape':'portrait',
      height: width>height?height-global.statusBarHeight:height,
      width: width,
    })
  }

  _onShowOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }

  _onBackButton = () => {
    const {goBack} = this.props.navigation;
    goBack();
  }


  _successAlert(){
    Alert.alert(
      'Great!',
      'Se ha borrado el registro del trade',
      [{text: 'Aceptar', onPress: this._onPressSuccessAlert}],
      { cancelable: false }
    )
  }

  _onPressSuccessAlert = () => {
    this._onBackButton()
    DeviceEventEmitter.emit('tradeDeleted',  {})
  }

  _onDelete = () => {
    this.setState({visible:true})
    http.http('DELETE', 'trades/'+this.state.params.trade.id+"/")
    .then((response) => {
      this.setState({visible: false});
      this._successAlert()
    })
    .catch((error) => {
      this.setState({visible: false});
      utils.showAlert('Error', 'Al conectarse con el servicio');
    });
  }

  _showRemoveIcon(){
    if(this.state.showRemoveIcon){
      return(
        <TouchableHighlight
          onPress={this._onDelete}
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            paddingRight: 15,
            paddingLeft: 15
          }}
          >
          <FontAwesome
            name="trash"
            size={25}
            color={theme.secondaryTextColor}
          />
        </TouchableHighlight>
      )
    }else{
      return null;
    }
  }

  _optionsTop(){
    return (
      <StyleProvider style={getTheme()}>
        <View
          style={{
            width: this.state.width,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            left: 0,
            top: 0
          }}
          >
            <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
              >
              <TouchableHighlight
                onPress={this._onBackButton}
                style={{
                  paddingTop: 15,
                  paddingBottom: 15,
                  paddingRight: 15,
                  paddingLeft: 15
                }}
                >
                <Ionicon
                  name="md-arrow-back"
                  size={25}
                  color={theme.secondaryTextColor}
                />
              </TouchableHighlight>
              {this.state.showRemoveIcon?this._showRemoveIcon():null}
            </View>
        </View>
      </StyleProvider>
    )
  }


  _optionsBottom(){
    return (
      <StyleProvider style={getTheme()}>
        <View
          style={{
            width: this.state.width,
            backgroundColor: 'rgba(0, 0, 0, 0.64)',
            position: 'absolute',
            bottom: 0
          }}
          >
            <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
            <View
              style={{
                flexDirection: this.state.orientation=='landscape'?'row':'column',
                justifyContent: 'space-between',
                padding: 10,
              }}
              >
              <View style={styles.bottomContainerText}>
                <FontAwesome style={styles.bottomIcons} name="arrow-circle-right" size={17} color={theme.secondaryTextColor}/>
                <Text style={styles.bottomTitleText}>ENTRY:</Text>
                <Text style={styles.bottomTextValue}>{this.state.params.trade.enter}</Text>
              </View>
              <View style={styles.bottomContainerText}>
                <FontAwesome style={styles.bottomIcons} name="arrow-circle-up" size={17} color='green'/>
                <Text style={styles.bottomTitleText}>PROFIT:</Text>
                <Text style={styles.bottomTextValue}>{this.state.params.trade.profit}</Text>
              </View>
              <View style={styles.bottomContainerText}>
                <FontAwesome style={styles.bottomIcons} name="arrow-circle-down" size={17} color='red'/>
                <Text style={styles.bottomTitleText}>STOP:</Text>
                <Text style={styles.bottomTextValue}>{this.state.params.trade.stop}</Text>
              </View>
            </View>
        </View>
      </StyleProvider>
    )
  }

  render() {
    if(this.state.dimensionLoaded){
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
          }}
          >
          <ImageZoom
            cropWidth={this.state.width}
            cropHeight={this.state.height}
            imageWidth={this.state.width}
            imageHeight={this.state.height}
            onClick={this._onShowOptions}
            onLongPress={this._onShowOptions}
            longPressTime={101}
          >
            <View style={{
              flex: 1,
              justifyContent: 'center',
            }}>
              <CustomImage
                url = {this.state.params.trade.photo}
                maxWidth = {this.state.width}
                maxHeight = {this.state.height}
              />
            </View>
          </ImageZoom>
          {this.state.showOptions?this._optionsTop():null}
          {this.state.showOptions?this._optionsBottom():null}
        </View>
      )
    }else{
      return false;
    }

  }

}
