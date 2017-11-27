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

import {DeviceEventEmitter} from 'react-native';

// Style
import { styles } from '../styles/other-trades';

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
import FilterSort from '../components/filter-sort';


export default class OtherTrades extends Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false,
      readyToRender: false,
      refreshing: false,
      params: props.navigation.state.params,
      filtersApplied: null
    }
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: navigation.state.params.username
  });

  componentWillMount() {
    DeviceEventEmitter.addListener('tradeCreated', (e)=>{
      this._loadTrades();
    })
    DeviceEventEmitter.addListener('tradeDeleted', (e)=>{
      this._loadTrades();
    })
    this.otherTradesApplyFiltersListener = DeviceEventEmitter.addListener('otherTradesApplyFilters', (e)=>{
      this._loadTrades(e);
    })
  }

  componentDidMount(){
    this._loadTrades();
  }

  componentWillUnmount(){
    this.otherTradesApplyFiltersListener.remove()
  }


  _loadTrades = (filtersApplied=null) => {
    if(filtersApplied!=null){
      this.setState({visible: true, 'filtersApplied': filtersApplied});
    }else{
      this.setState({visible: true});
    }
    let url = 'trades/?user='+this.state.params.id
    if(this.state.sortBy)url+=("&ordering="+this.state.sortBy)
    if(filtersApplied!=null){
      for(key in filtersApplied){
        if(filtersApplied[key]!='all')url+=('&'+key+'='+filtersApplied[key])
      }
    }
    http.http('GET', url)
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

  _onSortAndroidByChange = (value, label, filtersApplied) => {
    this.setState({sortBy: value})
    this._loadTrades(filtersApplied)
  }


  _onSortIOSByChange = (itemLabel, itemValue, filtersApplied) => {
    this.setState({sortBy: itemValue})
    this._loadTrades(filtersApplied)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <StyleProvider style={getTheme()}>
        <View style={styles.container}>
          <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
          <FilterSort
            _onSortIOSByChange={this._onSortIOSByChange}
            _onSortAndroidByChange={this._onSortAndroidByChange}
            filtersApplied={this.state.filtersApplied}
            navigate={navigate}
            eventEmmit={'otherTradesApplyFilters'}
          />
          <FlatList
            data = {this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <TradeItemList data={[item, navigate]} />}
            refreshing = {this.state.refreshing}
            onRefresh = {this._handleRefresh}
          />
        </View>
      </StyleProvider>
    );
  }

}
