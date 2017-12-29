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
  Platform,
  Picker,
  TouchableOpacity
} from 'react-native';

import {DeviceEventEmitter} from 'react-native';

// Style
import { styles } from '../styles/my-trades';

// Npm packages
import { StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
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
import SelectIOS from '../components/ios-select';
import FilterSort from '../components/filter-sort';

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
      filtersApplied: null,
    }
  }

  componentWillMount() {
    this.tradeCreatedListener = DeviceEventEmitter.addListener('tradeCreated', (e)=>{
      this._loadTrades();
    })
    this.tradeDeletedListener = DeviceEventEmitter.addListener('tradeDeleted', (e)=>{
      this._loadTrades();
    })
    this.tradeEditedListener = DeviceEventEmitter.addListener('tradeEdited', (e)=>{
      this._loadTrades();
    })
    this.myTradesapplyFiltersListener = DeviceEventEmitter.addListener('myTradesApplyFilters', (e)=>{
      this._loadTrades(e);
    })
  }

  componentWillUnmount(){
    this.tradeCreatedListener.remove();
    this.tradeDeletedListener.remove();
    this.tradeEditedListener.remove();
    this.myTradesapplyFiltersListener.remove();
  }

  componentDidMount(){
    this._loadTrades();
  }

  static navigationOptions = ({ navigation }) => {
    const {params = {}} = navigation.state;
    return {
      headerStyle:{ backgroundColor: theme.primaryNormalColor},
      headerTintColor: 'white',
      title: 'My Trades',
      headerLeft: <HomeLeftHeader navigation={navigation} />,
      drawerLabel: () => 'My Trades',
      drawerIcon: () => (
        <Icon
          name={'list-alt'}
          size={20}
          color={'#2d9c16'}
        />
      )
    };
  }


  _updateMenuState(isOpen) {
    this.setState({ isOpen,  });
  }


  _loadTrades = (filtersApplied=null) => {
    if(filtersApplied!=null){
      this.setState({visible: true, 'filtersApplied': filtersApplied});
    }else{
      this.setState({visible: true});
    }
    global.storage.load({
      key: 'user',
    })
    .then(ret => {
      let url = 'trades/?user='+ret.id
      if(this.state.sortBy)url+=("&ordering="+this.state.sortBy)
      if(filtersApplied!=null){
        for(key in filtersApplied){
          if(filtersApplied[key]!='all')url+=('&'+key+'='+filtersApplied[key])
        }
      }
      return http.http('GET', url)
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
      this._loadTrades(this.state.filtersApplied)
    })
  }

  _onSortAndroidByChange = (value, label) => {
    this.setState({sortBy: value})
    this._loadTrades(this.state.filtersApplied)
  }


  _onSortIOSByChange = (itemValue, itemLabel) => {
    this.setState({sortBy: itemValue})
    this._loadTrades(this.state.filtersApplied)
  }


  render() {
    const { navigate } = this.props.navigation;
    return(
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <FilterSort
            _onSortIOSByChange={this._onSortIOSByChange}
            _onSortAndroidByChange={this._onSortAndroidByChange}
            filtersApplied={this.state.filtersApplied}
            navigate={navigate}
            eventEmmit={'myTradesApplyFilters'}
          />
          <FlatList
            data = {this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <TradeItemList data={[item, navigate]} />}
            refreshing = {this.state.refreshing}
            onRefresh = {this._handleRefresh}
          />
          {this.state.platform!='ios'?<CustomActionButton navigate={navigate} />:null}
          {this.state.isOpen?<View style={styles.overlay} />:null}
        </View>
      </StyleProvider>
    )
  }

}
