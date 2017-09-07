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
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Import the custom theme
import * as theme from './styles/theme';


import { StackNavigator,  TabNavigator} from 'react-navigation';
import Login from './pages/login';
import Splash from './pages/splash';
import CreateTrade from './pages/create-trade';
import Photo from './pages/photo';

import './utils/global';

import {HomeTab} from './router/home-tab';

const SimpleApp = StackNavigator({
  splash: { screen: Splash },
  login: { screen: Login },
  home: { screen: HomeTab },
  createTrade: { screen: CreateTrade },
  photo: { screen: Photo },
});
AppRegistry.registerComponent('MDC', () => SimpleApp);
