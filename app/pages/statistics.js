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
import { styles } from '../styles/statistics';

// Npm packages
import { StyleProvider, Button } from 'native-base';
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

import DatePicker from 'react-native-datepicker'

import { Pie } from 'react-native-pathjs-charts'

export default class Statistics extends Component {

  render() {

    let data = [{
      "name": "30 Ticks",
      "population": 30,

      "color": {'r':238,'g':83,'b':80}
    }, {
      "name": "46 Ticks",
      "population": 46,
      "color": {'r':48,'g':181,'b':14}
    }]
    let options = {
      width: 300,
      height: 300,
      color: '#2980B9',
      r: 0,
      R: 150,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.datesContainer}>
            <DatePicker
              style={styles.datepickerItem}
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
            />
            <DatePicker
              style={styles.datepickerItem}
              mode="date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
            />
          </View>
          <Button info style={styles.loadButton}><Text> Cargar </Text></Button>
        </View>
        <View style={styles.pieContainer}>
          <Pie data={data}
            options={options}
            accessorKey="population"
            color="#2980B9"
            legendPosition="topLeft"
            />
        </View>
      </View>
    )
  }

}
