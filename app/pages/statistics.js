/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
  Button,
  TouchableNativeFeedback
} from 'react-native';

// Style
import { styles } from '../styles/statistics';

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

// Action android button
import ActionButton from 'react-native-action-button';

import DatePicker from 'react-native-datepicker';

import Dimensions from 'Dimensions';

import moment from 'moment';

import { Pie } from 'react-native-pathjs-charts'

import CustomCalendarIcon from '../components/custom-calendar-icon';

import HomeLeftHeader from '../components/home-left-header';

export default class Statistics extends Component {

  constructor(props){
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      visible: false,
      fromDate: moment().format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      dataLoaded: false,
      hasData: false,
      won: 0,
      lost: 0,
      height: Dimensions.get('window').height,
      platform: Platform.OS
    };
  }

  _customCalendarIcon = () => {
    return (
      <CustomCalendarIcon />
    )
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle:{ backgroundColor: theme.primaryNormalColor},
    headerTintColor: 'white',
    title: 'Statistics',
    drawerLabel: 'Statistics',
    headerLeft: <HomeLeftHeader navigation={navigation} />,
    drawerIcon: () => (
      <Icon
        name={'pie-chart'}
        size={20}
        color={'#ac2121'}
      />
    )
  });


  componentWillMount(){
    this._loadStatistics();
  }

  _loadStatistics = () =>{
    let params = '?from='+this.state.fromDate+'&to='+this.state.toDate;
    this.setState({visible: true});
    http.http('GET', 'trades/getStatistics/'+params)
    .then((response) => response.json())
    .then((responseJson)=>{
      let won = responseJson['won']
      let lost = -1*responseJson['lost']
      this.setState({
        visible: false,
        dataLoaded: true,
        won: won,
        lost: lost,
        hasData: (won>0 && lost>0)
      });
    })
    .catch((error) => {
      this.setState({visible: false});
      utils.showAlert('Error', 'Connection error');
    });
  }

  _onPressButton = () => {
    this._loadStatistics()
  }

  _renderEmptyChart(){
    return (
      <View style={styles.emptyChart}>
        <Text style={styles.emptyText}>There's no data to show</Text>
        <Icon
          name="frown-o"
          size={100}
        />
      </View>
    )
  }

  _androidButton(){
    return (
      <TouchableNativeFeedback
          onPress={this._onPressButton}
          background={TouchableNativeFeedback.Ripple('#616161')}>
          <View style={styles.loadButton}>
            <Text style={styles.loadTextButton}>LOAD</Text>
          </View>
      </TouchableNativeFeedback>
    )
  }

  _iosButton(){
    return(
      <TouchableHighlight
        onPress={this._onPressButton}
        >
        <View style={styles.loadButton}>
          <Text style={styles.loadTextButton}>LOAD</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _renderChart(){
    let data = [{
      "name": this.state.lost+" Ticks",
      "population": this.state.lost,

      "color": {'r':238,'g':83,'b':80}
    }, {
      "name": this.state.won+" Ticks",
      "population": this.state.won,
      "color": {'r':48,'g':181,'b':14}
    }]
    let options = {
      width: 300,
      height: 300,
      color: '#2980B9',
      r: 0,
      R: 120,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 15,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View style={styles.pieContainer}>
        <Pie data={data}
          options={options}
          accessorKey="population"
          color="#2980B9"
          legendPosition="topLeft"
          />
      </View>
    )
  }


  render() {
    if(this.state.dataLoaded){
      return (
        <StyleProvider style={getTheme()}>
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
            }}
            ref="myRef"
            >
            <ScrollView contentContainerStyle={styles.container}>
              <Spinner visible={this.state.visible} overlayColor={"rgba(0, 0, 0, 0.7)"}/>
              <View style={styles.formContainer}>
                <View style={styles.datesContainer}>
                  <DatePicker
                    style={[styles.datepickerItem, styles.firstDatepickerItem]}
                    mode="date"
                    date={this.state.fromDate}
                    onDateChange={(date) => {this.setState({fromDate: date})}}
                    format="YYYY-MM-DD"
                    iconComponent= {this._customCalendarIcon()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginLeft: 16,
                        borderWidth: 0
                      },
                      dateText:{
                        color: theme.primaryTextColor,
                      }
                    }}
                  />
                  <DatePicker
                    style={styles.datepickerItem}
                    mode="date"
                    date={this.state.toDate}
                    onDateChange={(date) => {this.setState({toDate: date})}}
                    format="YYYY-MM-DD"
                    iconComponent= {this._customCalendarIcon()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginLeft: 16,
                        borderWidth: 0
                      },
                      dateText:{
                        color: theme.primaryTextColor,
                      }
                    }}
                  />
                </View>
                {this.state.platform=='ios'?this._iosButton():this._androidButton()}
              </View>
              {(this.state.hasData)?this._renderChart():this._renderEmptyChart()}
            </ScrollView>
          </View>
        </StyleProvider>
      )
    }else{
      return null
    }

  }

}
