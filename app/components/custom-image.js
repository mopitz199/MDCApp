/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  Image,
} from 'react-native';

import Dimensions from 'Dimensions';

import styles from '../styles/custom-image';

export default class CustomImage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
      url: props.url,
    }

  }

  // This function get call only when the props are updating
  componentWillReceiveProps(props){
    this.setState({
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth
    }, () => {
      this._calculateImageSize();
    })
  }

  componentDidMount() {
    this._calculateImageSize();
  }


  _calculateImageSize(){
    Image.getSize(this.state.url, (width, height) => {
      let fImage = width/height;
      let fScreen = this.state.maxWidth/this.state.maxHeight;
      if(fImage<fScreen){
        this.setState({
          height: this.state.maxHeight,
          width: (this.state.maxHeight)*fImage
        })
      }else{
        this.setState({
          width: this.state.maxWidth,
          height: (this.state.maxWidth)/fImage
        });
      }
    });
  }

  render() {
    if(this.state.height!=null || this.state.width!=null){
      return (
        <Image
          style={[{height: this.state.height, width: this.state.width}, styles.image]}
          source={{uri: this.state.url}}
        />
      );
    }else{
      return null;
    }

  }
}
