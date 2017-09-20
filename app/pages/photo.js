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
  Image
} from 'react-native';

import Dimensions from 'Dimensions';

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
    }
  }

  componentDidMount(){
    let height = Dimensions.get('window').height
    this.setState({
      height: this.state.orientation=='landscape'?height-global.landscapeTopBarHeight:height,
      width: Dimensions.get('window').width,
      dimensionLoaded: true,
      showOptions: true,
      visible: false,
    });

    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      this.setState({
        orientation: width>height?'landscape':'portrait',
        height: width>height?height-global.landscapeTopBarHeight:height,
        width: width,
      })
    });

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

  _onDelete = () => {
    this.setState({visible:true})
    resp = http.http('DELETE', 'trades/'+this.state.params.id+"/")
    if(resp!=null){
      resp.then((response) => {
        this.setState({visible: false});
        utils.showAlert('Exito', 'Se ha borrado el registro del trade');
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

  _options(){
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
            /*borderColor: 'red',
            borderWidth: 1,*/
            backgroundColor: 'black',
            justifyContent: 'center',
          }}
          >
          <TouchableHighlight
            style={{
              flex: 1,
              backgroundColor: 'black',
              justifyContent: 'center',
            }}
            onPress={this._onShowOptions}
            >
            <View>
              <CustomImage
                url = {this.state.params.url}
                maxWidth = {this.state.width}
                maxHeight = {this.state.height}
              />
            </View>
          </TouchableHighlight>
          {this.state.showOptions?this._options():null}
        </View>
      )
    }else{
      return false;
    }

  }

}
