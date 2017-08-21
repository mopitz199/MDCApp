/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';


import { StackNavigator } from 'react-navigation';
import CreateTrade from './pages/create-trade';

import './utils/global';


const SimpleApp = StackNavigator({
  createTrade: { screen: CreateTrade }
});

AppRegistry.registerComponent('TradeData', () => SimpleApp);
