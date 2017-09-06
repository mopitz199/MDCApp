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
  FlatList,
} from 'react-native';

// Style
import { styles } from '../styles/my-trades';

// Npm packages
import { StyleProvider } from 'native-base';
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

// Components
import TradeItemList from '../components/trade-item-list';

import CustomActionButton from '../components/action-button';

export default class MyTrades extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      readyToRender: false,
      refreshing: false,
    };

  }


  componentWillMount(){
    this._loadTrades();
  }


  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: 'My Trades'
  });


  _loadTrades = () => {
    this.setState({visible: true});
    resp = http.http('GET', 'trades/')
    if(resp!=null){
      resp.then((response) => response.json())
      .then((responseJson)=>{
        this.setState({visible: false, data: responseJson, readyToRender: true, refreshing: false});
      })
      .catch((error) => {
        this.setState({visible: false, refreshing: false});
        utils.showAlert('Error', 'Al conectarse con el servicio');
      });
    }else{
      this.setState({visible: false, refreshing: false});
      utils.showAlert('Error', 'Al conectarse con el servicio');
    }
  }


  _keyExtractor = (item, index) => item.id;


  _handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this._loadTrades()
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    if(this.state.readyToRender){
      return (
        <StyleProvider style={getTheme()}>
          <View style={styles.container}>
            <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
            <FlatList
              data = {this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <TradeItemList data={item} />}
              refreshing = {this.state.refreshing}
              onRefresh = {this._handleRefresh}
            />
            <CustomActionButton navigate={navigate} />
          </View>
        </StyleProvider>
      );
    }else{
      return null;
    }
  }

}
