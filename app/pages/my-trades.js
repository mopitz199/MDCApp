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
  Platform
} from 'react-native';

import {DeviceEventEmitter} from 'react-native';

// Style
import { styles } from '../styles/my-trades';

// Npm packages
import { StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import { BackHandler } from 'react-native';

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

import SideMenu from 'react-native-side-menu';
import Menu from '../components/menu';

import HomeLeftHeader from '../components/home-left-header';

export default class MyTrades extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      readyToRender: false,
      refreshing: false,
      platform: Platform.OS,
      isOpen: false,
    }
  }

  componentWillMount() {
    DeviceEventEmitter.addListener('tradeCreated', (e)=>{
      this._loadTrades();
    })
    DeviceEventEmitter.addListener('tradeDeleted', (e)=>{
      this._loadTrades();
    })
    DeviceEventEmitter.addListener('tradeEdited', (e)=>{
      this._loadTrades();
    })
  }

  componentDidMount(){
    this.props.navigation.setParams({
        _toggleMenu: this._toggleMenu
    });
    this._loadTrades();
  }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle:{ backgroundColor: theme.primaryNormalColor},
      headerTintColor: 'white',
      title: 'My Trades',
      headerLeft: <HomeLeftHeader navigation={navigation} _toggleMenu={params._toggleMenu} />
    };
  }


  _toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  _updateMenuState(isOpen) {
    this.setState({ isOpen });
  }


  _loadTrades = () => {
    this.setState({visible: true});
    global.storage.load({
      key: 'user',
    })
    .then(ret => {
      return http.http('GET', 'trades/?user='+ret.id)
    })
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({visible: false, data: responseJson, readyToRender: true, refreshing: false});
    })
    .catch((error) => {
      this.setState({visible: false, refreshing: false});
      utils.showAlert('Error', 'Al conectarse con el servicio');
    });
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
    const menu = <Menu navigation={this.props.navigation} _goStatistics={this._goStatistics}/>;
    return (
      <StyleProvider style={getTheme()}>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this._updateMenuState(isOpen)}
        >
          <View style={styles.container}>
            <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
            <FlatList
              data = {this.state.data}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <TradeItemList data={[item, navigate]} />}
              refreshing = {this.state.refreshing}
              onRefresh = {this._handleRefresh}
            />
            {this.state.platform!='ios'?<CustomActionButton navigate={navigate} />:null}
          </View>
        </SideMenu>
      </StyleProvider>
    );
  }

}
