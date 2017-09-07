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
  Image,
  TouchableHighlight,
} from 'react-native';

// Style
import { styles } from '../styles/trade-item-list';

// Npm packages
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

// Import the custom theme
import * as theme from '../styles/theme';

export default class TradeItemList extends Component {

  _calculateResult = () => {
    if(this.props.data.result=='w'){
      return Math.abs((parseFloat(this.props.data.profit)-parseFloat(this.props.data.enter)))
    }else{
      return Math.abs((parseFloat(this.props.data.stop)-parseFloat(this.props.data.enter)))
    }
  }


  _onPressButton = () => {
    this.props.navigate('photo');
  }

  _getTradeDirection = () => {
    let profit = parseFloat(this.props.data.profit)
    let enter = parseFloat(this.props.data.enter)
    if(profit<enter){
      return "bear";
    }else{
      return "bull";
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton}>
        <View style={styles.tradeItemList}>
          <Image
            style={styles.tradeItemListLeft}
            source={{uri: this.props.data.photoThumbnail}}
          />
          <View style={styles.tradeItemListCenter}>
            <View style={styles.tradeItemListTopInfo}>
              <Text style={styles.date}>{this.props.data.date}</Text>
              <Text style={styles.time}>{this.props.data.time}</Text>
            </View>
            <View style={styles.tradeItemListBottomInfo}>
              <View style={styles.winLose}>
                <Icon
                  style={styles.winLoseIcon}
                  name={this._getTradeDirection()=='bull'?'arrow-up':'arrow-down'}
                  size={20}
                  color={theme.secondaryDarkColor}
                />
                <Text style={styles.winLoseText}>{this._getTradeDirection()=='bull'?'Largo':'Corto'}</Text>
              </View>
              <Text style={styles.tradeType}>Tipo: {this.props.data.tradeType}</Text>
            </View>
          </View>
          <View style={styles.tradeItemListRight}>
            <Text style={[styles.result, this.props.data.result=='w'?styles.winResult:styles.loseResult]} >{this._calculateResult()}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}
