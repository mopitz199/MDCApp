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

  state = {
    maxWidth: null,
    maxHeight: null,
    url: null
  }

  constructor(props) {
    super(props);
    this.state.maxWidth = props.maxWidth;
    this.state.maxHeight = props.maxHeight;
    this.state.url = props.url;

    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (this.refs.myRef){
        this.setState({maxWidth: width, maxHeight:height})
        this._calculateImageSize();
      }
    });
  }

  componentDidMount() {
    if (this.refs.myRef){
      this._calculateImageSize();
    }
  }


  _calculateImageSize(){
    Image.getSize(this.state.url, (width, height) => {
      let f = (this.state.maxWidth)/width;
      if((f*height)>this.state.maxHeight){
        this.setState({
          height: this.state.maxHeight,
          width: (this.state.maxHeight*width)/height
        })
      }else{
        this.setState({
          width: this.state.maxWidth,
          height: (this.state.maxWidth*height)/width
        })
      }
    });
  }

  render() {
    return (
      <Image
        ref="myRef"
        style={[{height: this.state.height, width: this.state.width}, styles.image]}
        source={{uri: this.state.url}}
      />
    );
  }
}
