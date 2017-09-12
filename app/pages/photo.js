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
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

import CustomImage from '../components/custom-image';

import Orientation from 'react-native-orientation';
import ImageZoom from 'react-native-image-pan-zoom';

export default class Photo extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white'
    //header: null
  });

  constructor(props){
    super(props);
    this.state = {
      visible: true,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }

  }

  componentDidMount(){
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (this.refs.myRef){
        this.setState({width: width, height:height})
      }
    });
  }


  render() {
    const { params } = this.props.navigation.state;
    return (
      <View
        style={{
          borderColor:'orange',
          borderWidth: 2,
          display: 'flex',
          justifyContent:'center',
          alignItems:'center'
        }}
        ref="myRef"
      >
        <ImageZoom cropWidth={this.state.width}
                   cropHeight={this.state.height}
                   imageWidth={this.state.width}
                   imageHeight={this.state.height}
                   >
            <View style={{
              display: 'flex',
              flex: 1,
              backgroundColor:'black',
              justifyContent:'center',
              alignItems:'center',
            }}>
              <CustomImage
                url = {params.url}
                maxWidth = {Dimensions.get('screen').width}
                maxHeight = {Dimensions.get('screen').height}
              />
            </View>
        </ImageZoom>
      </View>
    );
  }

}
